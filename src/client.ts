/**
 * cloud.dalane.api.projects
 * v1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
export const defaults: RequestOpts = {
    baseUrl: "http://projects.api.dalane.cloud/v1",
};
export const servers = {
    server1: "http://projects.api.dalane.cloud/v1"
};
type Encoders = Array<(s: string) => string>;
export type RequestOpts = {
    baseUrl?: string;
    fetch?: typeof fetch;
    headers?: Record<string, string | undefined>;
} & Omit<RequestInit, "body" | "headers">;
type FetchRequestOpts = RequestOpts & {
    body?: string | FormData;
};
type JsonRequestOpts = RequestOpts & {
    body: object;
};
type MultipartRequestOpts = RequestOpts & {
    body: Record<string, string | Blob | undefined | any>;
};
export const _ = {
    async fetch(url: string, req?: FetchRequestOpts) {
        const { baseUrl, headers, fetch: customFetch, ...init } = {
            ...defaults,
            ...req,
        };
        const href = _.joinUrl(baseUrl, url);
        const res = await (customFetch || fetch)(href, {
            ...init,
            headers: _.stripUndefined({ ...defaults.headers, ...headers }),
        });
        let text;
        try {
            text = await res.text();
        }
        catch (err) { }
        if (!res.ok) {
            throw new HttpError(res.status, res.statusText, href, text);
        }
        return text;
    },
    async fetchJson(url: string, req: FetchRequestOpts = {}) {
        const res = await _.fetch(url, {
            ...req,
            headers: {
                ...req.headers,
                Accept: "application/json",
            },
        });
        return res && JSON.parse(res);
    },
    json({ body, headers, ...req }: JsonRequestOpts) {
        return {
            ...req,
            body: JSON.stringify(body),
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
        };
    },
    form({ body, headers, ...req }: JsonRequestOpts) {
        return {
            ...req,
            body: QS.form(body),
            headers: {
                ...headers,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
    },
    multipart({ body, ...req }: MultipartRequestOpts) {
        const data = new FormData();
        Object.entries(body).forEach(([name, value]) => {
            data.append(name, value);
        });
        return {
            ...req,
            body: data,
        };
    },
    /**
     * Deeply remove all properties with undefined values.
     */
    stripUndefined<T>(obj: T) {
        return obj && JSON.parse(JSON.stringify(obj));
    },
    // Encode param names and values as URIComponent
    encodeReserved: [encodeURIComponent, encodeURIComponent],
    allowReserved: [encodeURIComponent, encodeURI],
    /**
     * Creates a tag-function to encode template strings with the given encoders.
     */
    encode(encoders: Encoders, delimiter = ",") {
        const q = (v: any, i: number) => {
            const encoder = encoders[i % encoders.length];
            if (typeof v === "object") {
                if (Array.isArray(v)) {
                    return v.map(encoder).join(delimiter);
                }
                const flat = Object.entries(v).reduce((flat, entry) => [...flat, ...entry], [] as any);
                return flat.map(encoder).join(delimiter);
            }
            return encoder(String(v));
        };
        return (strings: TemplateStringsArray, ...values: any[]) => {
            return strings.reduce((prev, s, i) => {
                return `${prev}${s}${q(values[i] || "", i)}`;
            }, "");
        };
    },
    /**
     * Separate array values by the given delimiter.
     */
    delimited(delimiter = ",") {
        return (params: Record<string, any>, encoders = _.encodeReserved) => Object.entries(params)
            .filter(([, value]) => value !== undefined)
            .map(([name, value]) => _.encode(encoders, delimiter) `${name}=${value}`)
            .join("&");
    },
    joinUrl(...parts: Array<string | undefined>) {
        return parts
            .filter(Boolean)
            .join("/")
            .replace(/([^:]\/)\/+/, "$1");
    },
};
/**
 * Functions to serialize query parameters in different styles.
 */
export const QS = {
    /**
     * Join params using an ampersand and prepends a questionmark if not empty.
     */
    query(...params: string[]) {
        const s = params.join("&");
        return s && `?${s}`;
    },
    /**
     * Serializes nested objects according to the `deepObject` style specified in
     * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#style-values
     */
    deep(params: Record<string, any>, [k, v] = _.encodeReserved): string {
        const qk = _.encode([(s) => s, k]);
        const qv = _.encode([(s) => s, v]);
        // don't add index to arrays
        // https://github.com/expressjs/body-parser/issues/289
        const visit = (obj: any, prefix = ""): string => Object.entries(obj)
            .filter(([, v]) => v !== undefined)
            .map(([prop, v]) => {
            const index = Array.isArray(obj) ? "" : prop;
            const key = prefix ? qk `${prefix}[${index}]` : prop;
            if (typeof v === "object") {
                return visit(v, key);
            }
            return qv `${key}=${v}`;
        })
            .join("&");
        return visit(params);
    },
    /**
     * Property values of type array or object generate separate parameters
     * for each value of the array, or key-value-pair of the map.
     * For other types of properties this property has no effect.
     * See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#encoding-object
     */
    explode(params: Record<string, any>, encoders = _.encodeReserved): string {
        const q = _.encode(encoders);
        return Object.entries(params)
            .filter(([, value]) => value !== undefined)
            .map(([name, value]) => {
            if (Array.isArray(value)) {
                return value.map((v) => q `${name}=${v}`).join("&");
            }
            if (typeof value === "object") {
                return QS.explode(value, encoders);
            }
            return q `${name}=${value}`;
        })
            .join("&");
    },
    form: _.delimited(),
    pipe: _.delimited("|"),
    space: _.delimited("%20"),
};
export class HttpError extends Error {
    status: number;
    data?: object;
    constructor(status: number, message: string, url: string, text?: string) {
        super(`${url} - ${message} (${status})`);
        this.status = status;
        if (text) {
            try {
                this.data = JSON.parse(text);
            }
            catch (err) { }
        }
    }
}
export type ApiResult<Fn> = Fn extends (...args: any) => Promise<infer T> ? T : never;
export type AssumptionStatusEnum = "Proposed" | "Open" | "Closed" | "Rejected" | "Deleted";
export type AssumptionImpactEnum = "None" | "Negligible" | "Minor" | "Moderate" | "Major" | "Severe";
export type AssumptionRatingEnum = "Very High" | "High" | "Moderate" | "Low" | "Very Low" | "None";
export type WorkpackageStatusEnum = "Proposed" | "Approved" | "Delivering" | "Completed" | "Rejected" | "Deleted";
export type WorkpackageEntity = {
    workpackage_id: string;
    project_id: string;
    wbs_element_id: string;
    friendly_id: string;
    title: string;
    status: WorkpackageStatusEnum;
    purpose?: string;
    description?: string;
    includes?: string;
    excludes?: string;
    commencement_criteria?: string;
    completion_criteria?: string;
    references?: string;
    created_at: number;
    updated_at: number;
    version: number;
};
export type RbsElement = {
    element_id: string;
    code: string;
    path: string;
    name: string;
    position: number;
    description?: string;
    parent_id?: string;
};
export type AssumptionEntity = {
    assumption_id: string;
    project_id: string;
    workpackage_id?: string;
    rbs_element_id?: string;
    assumption_number: number;
    name: string;
    status: AssumptionStatusEnum;
    description?: string;
    reason?: string;
    closeout_by?: number | null;
    closed_at?: number | null;
    actions?: string;
    incorrect_effect?: string;
    incorrect_schedule_impact?: AssumptionImpactEnum;
    incorrect_cost_impact?: AssumptionImpactEnum;
    incorrect_safety_impact?: AssumptionImpactEnum;
    incorrect_quality_impact?: AssumptionImpactEnum;
    incorrect_reputation_impact?: AssumptionImpactEnum;
    overall_impact?: AssumptionImpactEnum;
    incorrect_score?: number;
    incorrect_rating?: AssumptionRatingEnum;
    created_at: number;
    updated_at: number;
    version: number;
    workpackage?: WorkpackageEntity;
    rbs_element?: RbsElement;
};
export type AssumptionsByStatusEntity = {
    status: AssumptionStatusEnum;
    count: number;
};
export type AssumptionsByRatingEntity = {
    incorrect_rating: AssumptionRatingEnum;
    count: number;
};
export type AssumptionDashboardEntity = {
    by_status: AssumptionsByStatusEntity[];
    by_rating: AssumptionsByRatingEntity[];
    open: AssumptionEntity[];
};
export type CreateAssumptionDto = {
    workpackage_id?: string;
    rbs_element_id?: string;
    name: string;
    status: AssumptionStatusEnum;
    description?: string;
    reason?: string;
    closeout_by?: number;
    closed_at?: number;
    actions?: string;
    incorrect_effect?: string;
    incorrect_schedule_impact?: AssumptionImpactEnum;
    incorrect_cost_impact?: AssumptionImpactEnum;
    incorrect_safety_impact?: AssumptionImpactEnum;
    incorrect_quality_impact?: AssumptionImpactEnum;
    incorrect_reputation_impact?: AssumptionImpactEnum;
};
export type ErrorObject = {
    errors: {
        status: number;
        code: string;
        title: string;
        detail: string;
        source?: {
            pointer: string;
        };
        stack?: string;
    }[];
};
export type UpdateAssumptionDto = {
    workpackage_id?: string | null;
    rbs_element_id?: string | null;
    name?: string;
    status?: AssumptionStatusEnum;
    description?: string | null;
    reason?: string | null;
    closeout_by?: number | null;
    closed_at?: number | null;
    actions?: string | null;
    incorrect_effect?: string | null;
    incorrect_schedule_impact?: any;
    incorrect_cost_impact?: any;
    incorrect_safety_impact?: any;
    incorrect_quality_impact?: any;
    incorrect_reputation_impact?: any;
};
export type DependencyStatusEnum = "Proposed" | "Open" | "Delivered" | "Accepted" | "Rejected" | "Cancelled" | "Deleted";
export type LateDependencyImpactEnum = "None" | "Negligible" | "Minor" | "Moderate" | "Major" | "Severe";
export type LateDependencyRatingEnum = "Very High" | "High" | "Moderate" | "Low" | "Very Low" | "None";
export type DependencyEntity = {
    dependency_id: string;
    project_id: string;
    workpackage_id?: string;
    dependency_number: number;
    name: string;
    status: DependencyStatusEnum;
    description?: string | null;
    required_at?: number | null;
    expected_at?: number | null;
    actions?: string | null;
    late_cost_impact: LateDependencyImpactEnum;
    late_schedule_impact: LateDependencyImpactEnum;
    late_quality_impact: LateDependencyImpactEnum;
    late_reputation_impact: LateDependencyImpactEnum;
    late_safety_impact: LateDependencyImpactEnum;
    overall_impact: LateDependencyImpactEnum;
    late_delivery_score: number;
    late_delivery_rating: LateDependencyRatingEnum;
    created_at: number;
    updated_at: number;
    version: number;
    workpackage?: WorkpackageEntity;
};
export type DependenciesByStatusEntity = {
    status: DependencyStatusEnum;
    count: number;
};
export type DependenciesByRatingEntity = {
    late_delivery_rating: LateDependencyRatingEnum;
    count: number;
};
export type DependencyDashboardEntity = {
    by_status: DependenciesByStatusEntity[];
    by_rating: DependenciesByRatingEntity[];
    open: DependencyEntity[];
};
export type CreateDependencyDto = {
    workpackage_id?: string;
    name: string;
    status: DependencyStatusEnum;
    description?: string;
    required_at?: number;
    expected_at?: number;
    actions?: string;
    late_cost_impact?: LateDependencyImpactEnum;
    late_schedule_impact?: LateDependencyImpactEnum;
    late_quality_impact?: LateDependencyImpactEnum;
    late_reputation_impact?: LateDependencyImpactEnum;
    late_safety_impact?: LateDependencyImpactEnum;
};
export type UpdateDependencyDto = {
    name?: string;
    status?: DependencyStatusEnum;
    workpackage_id?: string | null;
    description?: string | null;
    required_at?: number | null;
    expected_at?: number | null;
    actions?: string | null;
    late_cost_impact?: LateDependencyImpactEnum;
    late_schedule_impact?: LateDependencyImpactEnum;
    late_quality_impact?: LateDependencyImpactEnum;
    late_reputation_impact?: LateDependencyImpactEnum;
    late_safety_impact?: LateDependencyImpactEnum;
};
export type IssueStatusEnum = "Proposed" | "Open" | "Closed" | "Rejected" | "Deleted";
export type IssueCauseEnum = "Risk" | "Assumption" | "Dependency" | "Other";
export type IssueImpactEnum = "None" | "Negligible" | "Minor" | "Moderate" | "Major" | "Severe";
export type IssueRatingEnum = "Very High" | "High" | "Moderate" | "Low" | "Very Low" | "None";
export type IssueEntity = {
    issue_id: string;
    project_id: string;
    workpackage_id: string | null;
    issue_number: number;
    name: string;
    status: IssueStatusEnum;
    description: string | null;
    reason: string | null;
    started_at: number | null;
    expected_at: number | null;
    closed_at: number | null;
    caused_by: IssueCauseEnum;
    assumption_id: string | null;
    risk_id: string | null;
    dependency_id: string | null;
    other_reason: string | null;
    actions: string | null;
    effect: string | null;
    schedule_impact: IssueImpactEnum;
    cost_impact: IssueImpactEnum;
    safety_impact: IssueImpactEnum;
    quality_impact: IssueImpactEnum;
    reputation_impact: IssueImpactEnum;
    issue_rating: IssueRatingEnum;
    created_at: number;
    updated_at: number;
    version: number;
    workpackage?: WorkpackageEntity;
};
export type IssueDashboardEntity = {
    count_by_status: {
        status: IssueStatusEnum;
        count: number;
    }[];
    count_by_rating: {
        issue_rating: IssueRatingEnum;
        count: number;
    }[];
    period_issues: IssueEntity[];
};
export type CreateIssueDto = {
    workpackage_id?: string;
    name: string;
    status: IssueStatusEnum;
    description?: string;
    started_at?: number;
    expected_at?: number;
    closed_at?: number;
    caused_by?: IssueCauseEnum;
    assumption_id?: string;
    risk_id?: string;
    dependency_id?: string;
    actions?: string;
    effect?: string;
    schedule_impact: IssueImpactEnum;
    cost_impact: IssueImpactEnum;
    safety_impact: IssueImpactEnum;
    quality_impact: IssueImpactEnum;
    reputation_impact: IssueImpactEnum;
};
export type UpdateIssueDto = {
    name?: string;
    status?: IssueStatusEnum;
    description?: string | null;
    started_at?: number | null;
    expected_at?: number | null;
    closed_at?: number | null;
    caused_by?: IssueCauseEnum;
    workpackage_id?: string | null;
    assumption_id?: string | null;
    risk_id?: string | null;
    dependency_id?: string | null;
    actions?: string | null;
    effect?: string | null;
    schedule_impact?: IssueImpactEnum;
    cost_impact?: IssueImpactEnum;
    safety_impact?: IssueImpactEnum;
    quality_impact?: IssueImpactEnum;
    reputation_impact?: IssueImpactEnum;
};
export type ObsEntity = {
    project_id: string;
    elements: {
        element_id: string;
        code: string;
        path: string;
        name: string;
        position: number;
        description?: string;
        parent_id?: string;
    }[];
    created_at: number;
    updated_at: number;
    version: number;
};
export type CreateObsDto = {
    method: "empty" | "upload" | "template" | "copy";
    templateName?: string;
    projectIdToCopy?: string;
    data?: object;
};
export type AddObsElementDto = {
    code: string;
    role: string;
    description?: string;
    parent_id?: string;
    position?: number;
};
export type ObsElement = {
    element_id: string;
    code: string;
    path: string;
    name: string;
    position: number;
    description?: string;
    parent_id?: string;
};
export type MoveObsElementDto = {
    parent_id?: string;
    position?: number;
};
export type UpdateObsElementDto = {
    code?: string;
    role?: string;
    description?: string;
};
export type OrganisationEntity = {
    organisation_id: string;
    name: string;
    created_at: number;
    updated_at: number;
    version: number;
};
export type ProjectStatusEnum = "Proposed" | "Delivering" | "Rejected" | "Completed" | "Deleted" | "Cancelled";
export type ProjectRiskSettings = {
    method: "Average" | "Highest";
    ratings: {
        extreme: {
            ge: number;
        };
        serious: {
            ge: number;
        };
        medium: {
            ge: number;
        };
        low: {
            ge: number;
        };
    };
};
export type ProjectEntity = {
    project_id: string;
    organisation_id?: string;
    owner_id?: string;
    name: string;
    description?: string;
    status: ProjectStatusEnum;
    friendly_id?: string;
    settings: {
        risk: ProjectRiskSettings;
    };
    created_at: number;
    updated_at: number;
    version: number;
};
export type CreateProjectDto = {
    name: string;
    description?: string;
    status: ProjectStatusEnum;
    organisation_id: string;
    friendly_id?: string;
    initialise?: boolean;
    settings?: {
        risk?: ProjectRiskSettings;
    };
};
export type RiskImpactEnum = "None" | "Negligible" | "Minor" | "Moderate" | "Major" | "Severe";
export type RiskHeatmapAggregate = {
    impact: RiskImpactEnum;
    "never": number;
    rare: number;
    unlikely: number;
    possible: number;
    likely: number;
    almost_certain: number;
}[];
export type RiskTypeEnum = "Threat" | "Opportunity";
export type RiskStatusEnum = "Proposed" | "Open" | "Managed" | "Expired" | "Rejected" | "Impacted" | "Deleted";
export type RiskLikelihoodEnum = "Never" | "Rare" | "Unlikely" | "Possible" | "Likely" | "Almost Certain";
export type RiskRatingEnum = "Very High" | "High" | "Moderate" | "Low" | "Very Low" | "None";
export type RiskResponseEnum = "Avoid" | "Reduce" | "Transfer" | "Accept";
export type RiskEntity = {
    risk_id: string;
    project_id: string;
    workpackage_id: string | null;
    risk_number: number;
    rbs_element_id: string | null;
    name: string;
    description: string | null;
    "type": RiskTypeEnum;
    starting_at: number | null;
    started_at: number | null;
    ending_at: number | null;
    ended_at: number | null;
    cause: string | null;
    effect: string | null;
    contingency: string | null;
    status: RiskStatusEnum;
    likelihood: RiskLikelihoodEnum;
    schedule_impact: RiskImpactEnum;
    cost_impact: RiskImpactEnum;
    safety_impact: RiskImpactEnum;
    quality_impact: RiskImpactEnum;
    reputation_impact: RiskImpactEnum;
    overall_impact?: RiskImpactEnum;
    score: number;
    rating: RiskRatingEnum;
    response_strategy: RiskResponseEnum;
    response_actions: string | null;
    residual_likelihood: RiskLikelihoodEnum;
    residual_schedule_impact: RiskImpactEnum;
    residual_cost_impact: RiskImpactEnum;
    residual_safety_impact: RiskImpactEnum;
    residual_quality_impact: RiskImpactEnum;
    residual_reputation_impact: RiskImpactEnum;
    residual_overall_impact: RiskImpactEnum;
    residual_effect: string | null;
    residual_score: number;
    residual_rating: RiskRatingEnum;
    current_likelihood: RiskLikelihoodEnum;
    current_schedule_impact: RiskImpactEnum;
    current_cost_impact: RiskImpactEnum;
    current_safety_impact: RiskImpactEnum;
    current_quality_impact: RiskImpactEnum;
    current_reputation_impact: RiskImpactEnum;
    current_overall_impact: RiskImpactEnum;
    current_score: number;
    current_rating: RiskRatingEnum;
    created_at: number;
    updated_at: number;
    version: number;
    workpackage?: WorkpackageEntity;
    rbs_element?: RbsElement;
};
export type PeriodRiskQueryAggregate = RiskEntity[];
export type RiskDashboardEntity = {
    heatmap: RiskHeatmapAggregate;
    period_risks: PeriodRiskQueryAggregate;
    by_status: {
        status: RiskStatusEnum;
        count: number;
    }[];
    by_response: {
        response_strategy: RiskResponseEnum;
        count: number;
    }[];
    by_type: {
        "type": RiskTypeEnum;
        count: number;
    }[];
    overdue_risks: RiskEntity[];
    by_rating: {
        current_rating: RiskRatingEnum;
        count: number;
    }[];
};
export type ProjectDashboardEntity = {
    risks: {
        risks: RiskDashboardEntity;
    };
};
export type RamAssignmentEnum = "Responsible" | "Accountable" | "Consultable" | "Informable";
export type RamEntity = {
    project_id: string;
    assignments: {
        assignment_id: string;
        wbs_element_id: string;
        obs_element_id: string;
        assignment: RamAssignmentEnum;
    }[];
    created_at: number;
    updated_at: number;
    version: number;
};
export type CreateRamDto = {
    method: "empty" | "upload";
    data?: object;
};
export type AddRamAssignmentDto = {
    wbs_element_id: string;
    obs_element_id: string;
    assignment: RamAssignmentEnum;
};
export type RamAssignmentEntity = {
    assignment_id: string;
    wbs_element_id: string;
    obs_element_id: string;
    assignment: RamAssignmentEnum;
};
export type UpdateRamAssignmentDto = {
    assignment: RamAssignmentEnum;
};
export type RbsEntity = {
    project_id: string;
    elements: {
        element_id: string;
        code: string;
        path: string;
        name: string;
        position: number;
        description?: string;
        parent_id?: string;
    }[];
    created_at: number;
    updated_at: number;
    version: number;
};
export type CreateRbsDto = {
    method: "empty" | "upload" | "template" | "copy";
    template_name?: string;
    project_id_to_copy?: string;
    data?: object;
};
export type AddRbsElementDto = {
    code: string;
    name: string;
    description?: string;
    parent_id?: string;
    position?: number;
};
export type MoveRbsElementDto = {
    parent_id?: string;
    position?: number;
};
export type UpdateWbsElementDto = {
    code?: string;
    name?: string;
    description?: string;
};
export type CreateRiskDto = {
    name: string;
    workpackage_id?: string;
    rbs_element_id?: string;
    description?: string;
    "type": RiskTypeEnum;
    starting_at?: number;
    ending_at?: number;
    impacted_at?: number;
    cause?: string;
    effect?: string;
    contingency?: string;
    status: RiskStatusEnum;
    likelihood: RiskLikelihoodEnum;
    schedule_impact: RiskImpactEnum;
    cost_impact: RiskImpactEnum;
    safety_impact: RiskImpactEnum;
    quality_impact: RiskImpactEnum;
    reputation_impact: RiskImpactEnum;
    response_strategy: RiskResponseEnum;
    response_actions?: string;
    residual_likelihood?: RiskLikelihoodEnum;
    residual_schedule_impact?: RiskImpactEnum;
    residual_cost_impact?: RiskImpactEnum;
    residual_safety_impact?: RiskImpactEnum;
    residual_quality_impact?: RiskImpactEnum;
    residual_reputation_impact?: RiskImpactEnum;
    residual_effect?: string;
};
export type UpdateRiskDto = {
    name?: string;
    workpackage_id?: string | null;
    rbs_element_id?: string | null;
    description?: string | null;
    "type"?: RiskTypeEnum;
    starting_at?: number | null;
    ending_at?: number | null;
    cause?: string | null;
    effect?: string | null;
    contingency?: string | null;
    status?: RiskStatusEnum;
    likelihood?: RiskLikelihoodEnum;
    schedule_impact?: RiskImpactEnum;
    cost_impact?: RiskImpactEnum;
    safety_impact?: RiskImpactEnum;
    quality_impact?: RiskImpactEnum;
    reputation_impact?: RiskImpactEnum;
    response_strategy?: RiskResponseEnum;
    response_actions?: string | null;
    residual_likelihood?: RiskLikelihoodEnum;
    residual_schedule_impact?: RiskImpactEnum;
    residual_cost_impact?: RiskImpactEnum;
    residual_safety_impact?: RiskImpactEnum;
    residual_quality_impact?: RiskImpactEnum;
    residual_reputation_impact?: RiskImpactEnum;
    residual_effect?: string | null;
};
export type WbsEntity = {
    project_id: string;
    elements: {
        element_id: string;
        code: string;
        path: string;
        name: string;
        position: number;
        description?: string;
        parent_id?: string;
    }[];
    created_at: number;
    updated_at: number;
    version: number;
};
export type CreateWbsDto = {
    method: "empty" | "upload" | "template" | "copy";
    template_name?: string;
    project_id_to_copy?: string;
    data?: object;
};
export type AddWbsElementDto = {
    code: string;
    name: string;
    description?: string;
    parent_id?: string;
    position?: number;
};
export type WbsElement = {
    element_id: string;
    code: string;
    path: string;
    name: string;
    position: number;
    description?: string;
    parent_id?: string;
};
export type MoveWbsElementDto = {
    parent_id?: string;
    position?: number;
};
export type AddWorkpackageDto = {
    wbs_element_id: string;
    friendly_id: string;
    title: string;
    status: WorkpackageStatusEnum;
    purpose?: string;
    description?: string;
    includes?: string;
    excludes?: string;
    commencement_criteria?: string;
    completion_criteria?: string;
    references?: string;
};
export type UpdateWorkpackageDto = {
    friendly_id?: string;
    title?: string;
    status?: WorkpackageStatusEnum;
    wbs_element_id?: string | null;
    purpose?: string | null;
    description?: string | null;
    includes?: string | null;
    excludes?: string | null;
    commencement_criteria?: string | null;
    completion_criteria?: string | null;
    references?: string | null;
};
export async function listProjectAssumptions(projectId: string, { workpackageId, include, filter }: {
    workpackageId?: string;
    include?: string[];
    filter?: {
        status?: string[];
    };
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/assumptions${QS.query(QS.form({
        workpackage_id: workpackageId
    }), QS.explode({
        include
    }), QS.deep({
        filter
    }))}`, {
        ...opts
    }) as AssumptionEntity[];
}
export async function getProjectAssumptionsDashboard(projectId: string, { closeoutByLimit }: {
    closeoutByLimit?: number;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/assumptions/dashboard${QS.query(QS.form({
        closeoutByLimit
    }))}`, {
        ...opts
    }) as AssumptionDashboardEntity;
}
export async function createProjectAssumption(projectId: string, createAssumptionDto: CreateAssumptionDto, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/assumptions/add`, _.json({
        ...opts,
        method: "POST",
        body: createAssumptionDto
    })) as AssumptionEntity;
}
export async function getProjectAssumptionById(projectId: string, assumptionId: string, { include }: {
    include?: string[];
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/assumptions/${assumptionId}${QS.query(QS.explode({
        include
    }))}`, {
        ...opts
    }) as AssumptionEntity;
}
export async function updateProjectAssumption(projectId: string, assumptionId: string, updateAssumptionDto: UpdateAssumptionDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/assumptions/${assumptionId}/update`, _.json({
        ...opts,
        method: "POST",
        body: updateAssumptionDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as AssumptionEntity;
}
export async function getUserDashboard(opts?: RequestOpts) {
    return await _.fetchJson("/dashboard", {
        ...opts
    }) as object;
}
export async function listProjectDependencies(projectId: string, { workpackageId, include, filter }: {
    workpackageId?: string;
    include?: string[];
    filter?: {
        status?: string[];
    };
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/dependencies${QS.query(QS.form({
        workpackage_id: workpackageId
    }), QS.explode({
        include
    }), QS.deep({
        filter
    }))}`, {
        ...opts
    }) as DependencyEntity[];
}
export async function getProjectDependencyDashboard(projectId: string, { requiredAtLimit }: {
    requiredAtLimit?: number;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/dependencies/dashboard${QS.query(QS.form({
        requiredAtLimit
    }))}`, {
        ...opts
    }) as DependencyDashboardEntity;
}
export async function createProjectDependency(projectId: string, createDependencyDto: CreateDependencyDto, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/dependencies/add`, _.json({
        ...opts,
        method: "POST",
        body: createDependencyDto
    })) as DependencyEntity;
}
export async function getProjectDependencyById(projectId: string, dependencyId: string, { include }: {
    include?: string[];
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/dependencies/${dependencyId}${QS.query(QS.explode({
        include
    }))}`, {
        ...opts
    }) as DependencyEntity;
}
export async function updateProjectDependency(projectId: string, dependencyId: string, updateDependencyDto: UpdateDependencyDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/dependencies/${dependencyId}/update`, _.json({
        ...opts,
        method: "POST",
        body: updateDependencyDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as DependencyEntity;
}
export async function listProjectIssues(projectId: string, { workpackageId, include, filter }: {
    workpackageId?: string;
    include?: string[];
    filter?: {
        status?: string[];
    };
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/issues${QS.query(QS.form({
        workpackage_id: workpackageId
    }), QS.explode({
        include
    }), QS.deep({
        filter
    }))}`, {
        ...opts
    }) as IssueEntity[];
}
export async function getProjectIssueDashboard(projectId: string, periodStart: number, periodEnd: number, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/issues/dashboard${QS.query(QS.form({
        period_start: periodStart,
        period_end: periodEnd
    }))}`, {
        ...opts
    }) as IssueDashboardEntity;
}
export async function createProjectIssue(projectId: string, createIssueDto: CreateIssueDto, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/issues/add`, _.json({
        ...opts,
        method: "POST",
        body: createIssueDto
    })) as IssueEntity;
}
export async function getProjectIssueById(projectId: string, issueId: string, { include }: {
    include?: string[];
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/issue/${issueId}${QS.query(QS.explode({
        include
    }))}`, {
        ...opts
    }) as IssueEntity;
}
export async function updateProjectIssue(projectId: string, issueId: string, updateIssueDto: UpdateIssueDto, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/issues/${issueId}/update`, _.json({
        ...opts,
        method: "POST",
        body: updateIssueDto
    })) as IssueEntity;
}
export async function listProjectObs(projectId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/obs`, {
        ...opts
    }) as ObsEntity;
}
export async function createProjectObs(projectId: string, createObsDto: CreateObsDto, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/obs/create`, _.json({
        ...opts,
        method: "POST",
        body: createObsDto
    })) as ObsEntity;
}
export async function addProjectObsElement(projectId: string, addObsElementDto: AddObsElementDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/obs/add`, _.json({
        ...opts,
        method: "POST",
        body: addObsElementDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as ObsElement;
}
export async function findProjectObsElement(projectId: string, elementId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/obs/${elementId}`, {
        ...opts
    }) as ObsElement;
}
export async function moveProjectObsElement(projectId: string, elementId: string, moveObsElementDto: MoveObsElementDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/obs/${elementId}/move`, _.json({
        ...opts,
        method: "POST",
        body: moveObsElementDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as ObsElement;
}
export async function updateProjectObsElement(projectId: string, elementId: string, updateObsElementDto: UpdateObsElementDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/obs/${elementId}/update`, _.json({
        ...opts,
        method: "POST",
        body: updateObsElementDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as ObsElement;
}
export async function deleteProjectObsElement(projectId: string, elementId: string, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetch(`/projects/${projectId}/obs/${elementId}/delete`, {
        ...opts,
        method: "POST",
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    });
}
export async function listOrganisations(opts?: RequestOpts) {
    return await _.fetchJson("/organisations", {
        ...opts
    }) as OrganisationEntity[];
}
export async function findOrganisationById(organisationId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/organisations/${organisationId}`, {
        ...opts
    }) as OrganisationEntity;
}
export async function listProjects({ filter }: {
    filter?: {
        organisation_id?: string;
    };
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects${QS.query(QS.deep({
        filter
    }))}`, {
        ...opts
    }) as ProjectEntity[];
}
export async function createProject(createProjectDto: CreateProjectDto, opts?: RequestOpts) {
    return await _.fetchJson("/projects/create", _.json({
        ...opts,
        method: "POST",
        body: createProjectDto
    })) as ProjectEntity;
}
export async function getProjectById(projectId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}`, {
        ...opts
    }) as ProjectEntity;
}
export async function getProjectDashboard(projectId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/dashboard`, {
        ...opts
    }) as ProjectDashboardEntity;
}
export async function listProjectRam(projectId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/ram`, {
        ...opts
    }) as RamEntity;
}
export async function createProjectRam(projectId: string, createRamDto: CreateRamDto, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/ram/create`, _.json({
        ...opts,
        method: "POST",
        body: createRamDto
    })) as RamEntity;
}
export async function addProjectRamAssignment(projectId: string, addRamAssignmentDto: AddRamAssignmentDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/ram/add`, _.json({
        ...opts,
        method: "POST",
        body: addRamAssignmentDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as RamAssignmentEntity;
}
export async function updateProjectRamAssignment(projectId: string, assignmentId: string, updateRamAssignmentDto: UpdateRamAssignmentDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/ram/${assignmentId}/update`, _.json({
        ...opts,
        method: "POST",
        body: updateRamAssignmentDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as RamAssignmentEntity;
}
export async function deleteProjectRamAssignment(projectId: string, assignmentId: string, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetch(`/projects/${projectId}/ram/${assignmentId}/delete`, {
        ...opts,
        method: "DELETE",
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    });
}
export async function listProjectRbs(projectId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/rbs`, {
        ...opts
    }) as RbsEntity;
}
export async function createProjectRbs(projectId: string, createRbsDto: CreateRbsDto, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/rbs/create`, _.json({
        ...opts,
        method: "POST",
        body: createRbsDto
    })) as RbsEntity;
}
export async function addProjectRbsElement(projectId: string, addRbsElementDto: AddRbsElementDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/rbs/add`, _.json({
        ...opts,
        method: "POST",
        body: addRbsElementDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as RbsElement;
}
export async function findProjectRbsElement(projectId: string, elementId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/rbs/${elementId}`, {
        ...opts
    }) as RbsElement;
}
export async function moveProjectRbsElement(projectId: string, elementId: string, moveRbsElementDto: MoveRbsElementDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/rbs/${elementId}/move`, _.json({
        ...opts,
        method: "POST",
        body: moveRbsElementDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as RbsElement;
}
export async function updateProjectRbsElement(projectId: string, elementId: string, updateWbsElementDto: UpdateWbsElementDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/rbs/${elementId}/update`, _.json({
        ...opts,
        method: "POST",
        body: updateWbsElementDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as RbsElement;
}
export async function deleteProjectRbsElement(projectId: string, elementId: string, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetch(`/projects/${projectId}/rbs/${elementId}/delete`, {
        ...opts,
        method: "POST",
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    });
}
export async function listProjectRisks(projectId: string, { workpackageId, include, filter }: {
    workpackageId?: string;
    include?: string[];
    filter?: {
        status?: string[];
    };
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/risks${QS.query(QS.form({
        workpackage_id: workpackageId
    }), QS.explode({
        include
    }), QS.deep({
        filter
    }))}`, {
        ...opts
    }) as RiskEntity[];
}
export async function getRiskDashboardByProject(projectId: string, periodStart: number, periodEnd: number, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/risks/dashboard${QS.query(QS.form({
        period_start: periodStart,
        period_end: periodEnd
    }))}`, {
        ...opts
    }) as RiskDashboardEntity;
}
export async function createProjectRisk(projectId: string, createRiskDto: CreateRiskDto, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/risks/add`, _.json({
        ...opts,
        method: "POST",
        body: createRiskDto
    })) as RiskEntity;
}
export async function getProjectRiskById(projectId: string, riskId: string, { include }: {
    include?: string[];
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/risks/${riskId}${QS.query(QS.explode({
        include
    }))}`, {
        ...opts
    }) as RiskEntity;
}
export async function updateProjectRisk(projectId: string, riskId: string, updateRiskDto: UpdateRiskDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/risks/${riskId}/update`, _.json({
        ...opts,
        method: "POST",
        body: updateRiskDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as RiskEntity;
}
export async function listProjectWbs(projectId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/wbs`, {
        ...opts
    }) as WbsEntity;
}
export async function createProjectWbs(projectId: string, createWbsDto: CreateWbsDto, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/wbs/create`, _.json({
        ...opts,
        method: "POST",
        body: createWbsDto
    })) as WbsEntity;
}
export async function addProjectWbsElement(projectId: string, addWbsElementDto: AddWbsElementDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/wbs/add`, _.json({
        ...opts,
        method: "POST",
        body: addWbsElementDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as WbsElement;
}
export async function findProjectWbsElement(projectId: string, elementId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/wbs/${elementId}`, {
        ...opts
    }) as WbsElement;
}
export async function moveProjectWbsElement(projectId: string, elementId: string, moveWbsElementDto: MoveWbsElementDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/wbs/${elementId}/move`, _.json({
        ...opts,
        method: "POST",
        body: moveWbsElementDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as WbsElement;
}
export async function updateProjectWbsElement(projectId: string, elementId: string, updateWbsElementDto: UpdateWbsElementDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/wbs/${elementId}/update`, _.json({
        ...opts,
        method: "POST",
        body: updateWbsElementDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as WbsElement;
}
export async function deleteProjectWbsElement(projectId: string, elementId: string, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetch(`/projects/${projectId}/wbs/${elementId}/delete`, {
        ...opts,
        method: "POST",
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    });
}
export async function listWorkPackages(projectId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/work-packages`, {
        ...opts
    }) as WorkpackageEntity[];
}
export async function addWorkPackage(projectId: string, addWorkpackageDto: AddWorkpackageDto, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/work-packages/add`, _.json({
        ...opts,
        method: "POST",
        body: addWorkpackageDto
    })) as WorkpackageEntity;
}
export async function findWorkPackageById(projectId: string, workpackageId: string, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/work-packages/${workpackageId}`, {
        ...opts
    }) as WorkpackageEntity;
}
export async function updateWorkPackage(projectId: string, workpackageId: string, updateWorkpackageDto: UpdateWorkpackageDto, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetchJson(`/projects/${projectId}/work-packages/${workpackageId}/update`, _.json({
        ...opts,
        method: "POST",
        body: updateWorkpackageDto,
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    })) as WorkpackageEntity;
}
export async function markWorkPackageAsDeleted(projectId: string, workpackageId: string, { xExpectedVersion }: {
    xExpectedVersion?: string;
} = {}, opts?: RequestOpts) {
    return await _.fetch(`/projects/${projectId}/work-packages/${workpackageId}/delete`, {
        ...opts,
        method: "DELETE",
        headers: {
            ...opts && opts.headers,
            "X-Expected-Version": xExpectedVersion
        }
    });
}
