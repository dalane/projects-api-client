import * as ApiClient from './client';
import CircuitBreaker from 'opossum';
import { DomainServiceUnavailableError, DomainAttributeError, SerializedErrorPayload, DomainError, createDomainValidationError, deserializeErrorObject, ErrorObject } from "./errors";
import Debug from 'debug';
import { parseAdapterError, fetch as nodeFetch, FetchError } from './fetch';
import { HTTP_STATUS_CODES } from "./constants";

import {
	CreateProjectDto,
	ProjectEntity,
	ObsEntity as ProjectObsEntity,
	ObsElement as ProjectObsElement,
	WbsEntity as ProjectWbsEntity,
	RamEntity as ProjectRamEntity,
	RamAssignmentEntity as ProjectRamAssignment,
	CreateObsDto as CreateProjectObsDto,
	AddObsElementDto,
	MoveObsElementDto,
	UpdateObsElementDto,
	CreateWbsDto as CreateProjectWbsDto,
	WbsElement as ProjectWbsElement,
	AddWbsElementDto,
	MoveWbsElementDto,
	UpdateWbsElementDto,
	RbsEntity as ProjectRbsEntity,
	RbsElement as ProjectRbsElement,
	CreateRbsDto as CreateProjectRbsDto,
	AddRbsElementDto,
	MoveRbsElementDto,
	CreateRamDto as CreateProjectRamDto,
	AddRamAssignmentDto,
	UpdateRamAssignmentDto,
	WorkpackageEntity,
	AddWorkpackageDto,
	UpdateWorkpackageDto,
	CreateRiskDto as AddProjectRiskDto,
	UpdateRiskDto as UpdateProjectRiskDto,
	RiskEntity,
	CreateAssumptionDto as AddProjectAssumptionDto,
	UpdateAssumptionDto,
	AssumptionEntity,
	CreateIssueDto as AddIssueDto,
	UpdateIssueDto,
	IssueEntity,
	CreateDependencyDto as AddDependencyDto,
	UpdateDependencyDto,
	DependencyEntity,
	OrganisationEntity,
	ProjectDashboardEntity,
	RiskDashboardEntity,
	ProjectRiskSettings as RiskManagementSettings,
	IssueDashboardEntity
} from './client';

export {
	CreateProjectDto,
	ProjectEntity,
	ProjectObsEntity,
	ProjectObsElement,
	ProjectWbsEntity,
	ProjectRamEntity,
	ProjectRamAssignment,
	CreateProjectObsDto,
	AddObsElementDto,
	MoveObsElementDto,
	UpdateObsElementDto,
	CreateProjectWbsDto,
	ProjectWbsElement,
	AddWbsElementDto,
	MoveWbsElementDto,
	UpdateWbsElementDto,
	ProjectRbsEntity,
	ProjectRbsElement,
	CreateProjectRbsDto,
	AddRbsElementDto,
	MoveRbsElementDto,
	CreateProjectRamDto,
	AddRamAssignmentDto,
	UpdateRamAssignmentDto,
	WorkpackageEntity,
	AddWorkpackageDto,
	UpdateWorkpackageDto,
	AddProjectRiskDto,
	UpdateProjectRiskDto,
	RiskEntity,
	AddProjectAssumptionDto,
	UpdateAssumptionDto,
	AssumptionEntity,
	AddIssueDto,
	UpdateIssueDto,
	IssueEntity,
	AddDependencyDto,
	UpdateDependencyDto,
	DependencyEntity,
	OrganisationEntity,
	ProjectDashboardEntity,
	RiskManagementSettings,
	IssueDashboardEntity
};

// export interface CreateProjectDto extends ApiClient.CreateProjectDto {}

export interface Entity {
	created_at: string;
	updated_at: string;
	version: number;
}

export interface ProjectSettings {
	risk: RiskManagementSettings;
}

export interface DeleteObsElementDto {
	expectedVersion?: number;
}


export interface DeleteWbsElementDto {
}

export interface UpdateRbsElementDto {
	code?: string;
	name?: string;
	description?: string;
}

export interface DeleteRbsElementDto {
}



export interface DashboardEntity {}

export interface ListProjectOptions {
	filter?: {
		organisation_id?: string;
	}
}



export interface ProjectApiClient {

	dashboard: (token: string) => Promise<DashboardEntity | Error>;

	// project

	projects: {
		listProjects: (token: string, options?: ListProjectOptions) => Promise<ProjectEntity[]|Error>;
		createProject: (token: string, dto: CreateProjectDto) => Promise<ProjectEntity|Error>;
		getProjectById: (token: string, projectId: string) => Promise<ProjectEntity|Error>;
	};

	// project obs

	obs: {
		createProjectObs: (token: string, projectId: string, dto: CreateProjectObsDto) => Promise<ProjectObsEntity|Error>;
		listProjectObs: (token: string, projectId: string) => Promise<ProjectObsEntity|Error>;
		addProjectObsElement: (token: string, projectId: string, dto: AddObsElementDto, expectedVersion?: number) => Promise<ProjectObsElement|Error>;
		moveProjectObsElement: (token: string, projectId: string, elementId: string, dto: MoveObsElementDto, expectedVersion?: number) => Promise<ProjectObsElement|Error>;
		findProjectObsElement: (token: string, projectId: string, elementId: string) => Promise<ProjectObsElement|Error>;
		updateProjectObsElement: (token: string, projectId: string, elementId: string, dto: UpdateObsElementDto, expectedVersion?: number) => Promise<ProjectObsElement|Error>;
		deleteProjectObsElement: (token: string, projectId: string, elementId: string, expectedVersion?: number) => Promise<void|Error>;
	};

	// project wbs

	wbs: {
		createProjectWbs: (token: string, projectId: string, dto: CreateProjectWbsDto) => Promise<ProjectWbsEntity|Error>;
		listProjectWbs: (token: string, projectId: string) => Promise<ProjectWbsEntity|Error>;
		addProjectWbsElement: (token: string, projectId: string, dto: AddWbsElementDto, expectedVersion?: number) => Promise<ProjectWbsElement|Error>;
		moveProjectWbsElement: (token: string, projectId: string, elementId: string, dto: MoveWbsElementDto, expectedVersion?: number) => Promise<ProjectWbsElement|Error>;
		findProjectWbsElement: (token: string, projectId: string, elementId: string) => Promise<ProjectWbsElement|Error>;
		updateProjectWbsElement: (token: string, projectId: string, elementId: string, dto: UpdateWbsElementDto, expectedVersion?: number) => Promise<ProjectWbsElement|Error>;
		deleteProjectWbsElement: (token: string, projectId: string, elementId: string, expectedVersion?: number) => Promise<void|Error>;
	};

	// project wbs

	rbs: {
		createProjectRbs: (token: string, projectId: string, dto: CreateProjectRbsDto) => Promise<ProjectRbsEntity|Error>;
		listProjectRbs: (token: string, projectId: string) => Promise<ProjectRbsEntity|Error>;
		addProjectRbsElement: (token: string, projectId: string, dto: AddRbsElementDto, expectedVersion?: number) => Promise<ProjectRbsElement|Error>;
		moveProjectRbsElement: (token: string, projectId: string, elementId: string, dto: MoveRbsElementDto, expectedVersion?: number) => Promise<ProjectRbsElement|Error>;
		findProjectRbsElement: (token: string, projectId: string, elementId: string) => Promise<ProjectRbsElement|Error>;
		updateProjectRbsElement: (token: string, projectId: string, elementId: string, dto: UpdateRbsElementDto, expectedVersion?: number) => Promise<ProjectRbsElement|Error>;
		deleteProjectRbsElement: (token: string, projectId: string, elementId: string, expectedVersion?: number) => Promise<void|Error>;
	};

	// Project RAM

	ram: {
		createProjectRam: (token: string, projectId: string, dto: CreateProjectRamDto) => Promise<ProjectRamEntity|Error>;
		listProjectRam: (token: string, projectId: string) => Promise<ProjectRamEntity|Error>;
		addProjectRamAssignment: (token: string, projectId: string, dto: AddRamAssignmentDto, expectedVersion?: number) => Promise<ProjectRamAssignment|Error>;
		updateProjectRamAssignment: (token: string, projectId: string, assignmentId: string, dto: UpdateRamAssignmentDto, expectedVersion?: number) => Promise<ProjectRamAssignment|Error>;
		deleteProjectRamAssignment: (token: string, projectId: string, assignmentId: string, expectedVersion?: number) => Promise<void|Error>;
	};

	// Work Packages
	workpackages: {
		addWorkPackage: (token: string, projectId: string, dto: AddWorkpackageDto) => Promise<WorkpackageEntity|Error>;
		updateWorkPackage: (token: string, projectId: string, workpackageId: string, dto: UpdateWorkpackageDto, expectedVersion?: number) => Promise<WorkpackageEntity|Error>;
		listWorkPackages: (token: string, projectId: string) => Promise<WorkpackageEntity[]|Error>;
		deleteWorkPackage: (token: string, projectId: string, workpackageId: string, expectedVersion?: number) => Promise<void|Error>;
		getWorkpackageById: (token: string, projectId: string, workpackageId: string) => Promise<WorkpackageEntity|Error>
	};

	risks: {
		addRisk: (token: string, projectId: string, dto: AddProjectRiskDto) => Promise<RiskEntity|Error>;
		listRisks: (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[]; } }) => Promise<RiskEntity[]|Error>;
		getRisk: (token: string, projectId: string, riskId: string, options?: { include?: string[] }) => Promise<RiskEntity|Error>;
		updateRisk: (token: string, projectId: string, riskId: string, dto: UpdateProjectRiskDto, expectedVersion: number) => Promise<RiskEntity|Error>;
		getProjectDashboard: (token: string, projectId: string, periodStart: number, periodEnd: number) => Promise<RiskDashboardEntity | Error>;
	};

	assumptions: {
		addAssumption: (token: string, projectId: string, dto: AddProjectAssumptionDto) => Promise<AssumptionEntity|Error>;
		listAssumptions: (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[]; } }) => Promise< AssumptionEntity[] | Error >;
		getAssumption: (token: string, projectId: string, assumptionId: string, options?: { include?: string[] }) => Promise< AssumptionEntity | Error >;
		updateAssumption: (token: string, projectId: string, assumptionId: string, dto: UpdateAssumptionDto, expectedVersion?: number) => Promise<AssumptionEntity | Error>;
		getProjectDashboard: (token: string, projectId: string, closeoutByLimit?: number) => Promise<ApiClient.AssumptionDashboardEntity | Error>;
	};

	issues: {
		add: (token: string, projectId: string, dto: AddIssueDto) => Promise<IssueEntity|Error>;
		list: (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[]; } }) => Promise< IssueEntity[] | Error >;
		getById: (token: string, projectId: string, issuedId: string, options?: { include?: string[] }) => Promise< IssueEntity | Error >;
		update: (token: string, projectId: string, issueId: string, dto: UpdateIssueDto) => Promise<IssueEntity|Error>;
		getProjectDashboard: (token: string, projectId: string, periodStart: number, periodEnd: number) => Promise<IssueDashboardEntity | Error>;
	};

	dependencies: {
		add: (token: string, projectId: string, dto: AddDependencyDto) => Promise<DependencyEntity|Error>;
		list: (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[]; } }) => Promise< DependencyEntity[] | Error >;
		getById: (token: string, projectId: string, dependencyId: string, options?: { include?: string[] }) => Promise< DependencyEntity | Error >;
		update: (token: string, projectId: string, dependencyId: string, dto: UpdateDependencyDto, expectedVersion: number) => Promise<DependencyEntity | Error>;
		getProjectDashboard: (token: string, projectId: string, requiredAtLimit?: number) => Promise<ApiClient.DependencyDashboardEntity | Error>;
	};

	organisations: {
		list: (token: string) => Promise<Error | OrganisationEntity[]>;
		findById: (token: string, organisationId: string) => Promise<Error | OrganisationEntity>;
	};

}

export interface ApiClientSettings {
	/**
	 * URL to the API base including the version, e.g. "https: //projects.api.dalane.cloud/v1"
	 */
	baseUrl?: string;
}

const debug = Debug('app: service: project-api');

export const createProjectApiClient = (settings: ApiClientSettings): ProjectApiClient => {

	const { baseUrl } = settings;

	if (baseUrl === undefined) {
		const servers = Object.values(ApiClient.servers);
		if (servers.length === 0) {
			throw new RangeError('Unable to initialise the Projects API client as the schema does not include a server address and an alternative server address was not specified in the client settings.');
		}
		ApiClient.defaults.baseUrl = servers[0];
	} else {
		ApiClient.defaults.baseUrl = baseUrl;
	}

	ApiClient.defaults.credentials = "include";
	ApiClient.defaults.fetch = nodeFetch as unknown as typeof fetch;

	const createApiRequestOpts = (token: string): ApiClient.RequestOpts => {
		return {
			headers: {
				authorization: `Bearer ${token}`
			}
		};
	};

	function makeEndpointHandler<TI extends unknown[] = unknown[], TR = unknown>(callback: (...args: TI) => Promise<TR | Error>) {
		const cb = new CircuitBreaker(async (...args: TI) => {
			return callback(...args).catch(clientErrorHandler);
		});
		return (...args: TI) => cb.fire(...args).catch(circuitBreakerErrorHandler);
	}

	const nullFn = () => {};

	function makeNoContentHandler<TI extends unknown[] = unknown[], TR = unknown>(callback: (...args: TI) => Promise<TR | Error>) {
		const cb = new CircuitBreaker(async (...args: TI) => {
			// we need to do a then with null function or else the functon doesn't work properly
			return callback(...args).then(nullFn).catch(clientErrorHandler);
		});
		return (...args: TI) => cb.fire(...args).catch(circuitBreakerErrorHandler);
	}

	const formatExpectedVersion = (expectedVersion?: number): { xExpectedVersion: string | undefined } | undefined => !!expectedVersion ? { xExpectedVersion: String(expectedVersion) } : undefined;

	const getDashboardHandler = makeEndpointHandler(ApiClient.getUserDashboard);
	const getDashboardFn = async (token: string) => await getDashboardHandler(createApiRequestOpts(token));

	// projects...

	const listProjectsHandler = makeEndpointHandler(ApiClient.listProjects);
	const createProjectHandler = makeEndpointHandler(ApiClient.createProject);
	const getProjectByIdHandler = makeEndpointHandler(ApiClient.getProjectById);

	// obs...

	const listProjectObsHandler = makeEndpointHandler(ApiClient.listProjectObs);
	const createProjectObsHandler = makeEndpointHandler(ApiClient.createProjectObs);
	const addProjectObsElementHandler = makeEndpointHandler(ApiClient.addProjectObsElement);
	const moveProjectObsElementHandler = makeEndpointHandler(ApiClient.moveProjectObsElement);
	const findProjectObsElementHandler = makeEndpointHandler(ApiClient.findProjectObsElement);
	const updateProjectObsElementHandler = makeEndpointHandler(ApiClient.updateProjectObsElement);
	const deleteProjectObsElementHandler = makeNoContentHandler(ApiClient.deleteProjectObsElement);

	// wbs...

	const listProjectWbs = async (token: string, projectId: string) => ApiClient.listProjectWbs(projectId, createApiRequestOpts(token)).catch(clientErrorHandler);
	const listProjectWbsCircuitBreaker = new CircuitBreaker(listProjectWbs);

	const createProjectWbs = async (token: string, projectId: string, dto: CreateProjectWbsDto) => ApiClient.createProjectWbs(projectId, dto, createApiRequestOpts(token)).catch(clientErrorHandler);
	const createProjectWbsCircuitBreaker = new CircuitBreaker(createProjectWbs);

	const addProjectWbsElement = async (token: string, projectId: string, dto: AddWbsElementDto, expectedVersion?: number) => ApiClient.addProjectWbsElement(projectId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const addProjectWbsElementCircuitBreaker = new CircuitBreaker(addProjectWbsElement);

	const moveProjectWbsElement = async (token: string, projectId: string, elementId: string, dto: MoveWbsElementDto, expectedVersion?: number) => ApiClient.moveProjectWbsElement(projectId, elementId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const moveProjectWbsElementCircuitBreaker = new CircuitBreaker(moveProjectWbsElement);

	const findProjectWbsElementItem = async (token: string, projectId: string, elementId: string) => ApiClient.findProjectWbsElement(projectId, elementId, createApiRequestOpts(token)).catch(clientErrorHandler);
	const findProjectWbsElementItemCircuitBreaker = new CircuitBreaker(findProjectWbsElementItem);

	const updateProjectWbsElement = async (token: string, projectId: string, elementId: string, dto: UpdateWbsElementDto, expectedVersion?: number) => ApiClient.updateProjectWbsElement(projectId, elementId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const updateProjectWbsElementCircuitBreaker = new CircuitBreaker(updateProjectWbsElement);

	// any api calls that don't return any content needs to be handled with a .then block first that doesn't do anything just so that we can have a void return type.
	const deleteProjectWbsElement = async (token: string, projectId: string, elementId: string, expectedVersion?: number) => ApiClient.deleteProjectWbsElement(projectId, elementId, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).then(() => {}).catch(clientErrorHandler);
	const deleteProjectWbsElementCircuitBreaker = new CircuitBreaker(deleteProjectWbsElement);

	// rbs...

	const listProjectRbs = async (token: string, projectId: string) => ApiClient.listProjectRbs(projectId, createApiRequestOpts(token)).catch(clientErrorHandler);
	const listProjectRbsCircuitBreaker = new CircuitBreaker(listProjectRbs);

	const createProjectRbs = async (token: string, projectId: string, dto: CreateProjectRbsDto) => ApiClient.createProjectRbs(projectId, dto, createApiRequestOpts(token)).catch(clientErrorHandler);
	const createProjectRbsCircuitBreaker = new CircuitBreaker(createProjectRbs);

	const addProjectRbsElement = async (token: string, projectId: string, dto: AddRbsElementDto, expectedVersion?: number) => ApiClient.addProjectRbsElement(projectId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const addProjectRbsElementCircuitBreaker = new CircuitBreaker(addProjectRbsElement);

	const moveProjectRbsElement = async (token: string, projectId: string, elementId: string, dto: MoveRbsElementDto, expectedVersion?: number) => ApiClient.moveProjectRbsElement(projectId, elementId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const moveProjectRbsElementCircuitBreaker = new CircuitBreaker(moveProjectRbsElement);

	const findProjectRbsElementItem = async (token: string, projectId: string, elementId: string) => ApiClient.findProjectRbsElement(projectId, elementId, createApiRequestOpts(token)).catch(clientErrorHandler);
	const findProjectRbsElementItemCircuitBreaker = new CircuitBreaker(findProjectRbsElementItem);

	const updateProjectRbsElement = async (token: string, projectId: string, elementId: string, dto: UpdateRbsElementDto, expectedVersion?: number) => ApiClient.updateProjectRbsElement(projectId, elementId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const updateProjectRbsElementCircuitBreaker = new CircuitBreaker(updateProjectRbsElement);

	// any api calls that don't return any content needs to be handled with a .then block first that doesn't do anything just so that we can have a void return type.
	const deleteProjectRbsElement = async (token: string, projectId: string, elementId: string, expectedVersion?: number) => ApiClient.deleteProjectRbsElement(projectId, elementId, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).then(() => {}).catch(clientErrorHandler);
	const deleteProjectRbsElementCircuitBreaker = new CircuitBreaker(deleteProjectRbsElement);

	// ram...

	const listProjectRam = async (token: string, projectId: string) => ApiClient.listProjectRam(projectId, createApiRequestOpts(token)).catch(clientErrorHandler);
	const listProjectRamCircuitBreaker = new CircuitBreaker(listProjectRam);

	const createProjectRam = async (token: string, projectId: string, dto: CreateProjectRamDto) => ApiClient.createProjectRam(projectId, dto, createApiRequestOpts(token)).catch(clientErrorHandler);
	const createProjectRamCircuitBreaker = new CircuitBreaker(createProjectRam);

	const addProjectRamAssignment = async (token: string, projectId: string, dto: AddRamAssignmentDto, expectedVersion?: number) => ApiClient.addProjectRamAssignment(projectId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const addProjectRamAssignmentCircuitBreaker = new CircuitBreaker(addProjectRamAssignment);

	const updateProjectRamAssignment = async (token: string, projectId: string, assignmentId: string, dto: UpdateRamAssignmentDto, expectedVersion?: number) => ApiClient.updateProjectRamAssignment(projectId, assignmentId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const updateProjectRamAssignmentCircuitBreaker = new CircuitBreaker(updateProjectRamAssignment);

	// any api calls that don't return any content needs to be handled with a .then block first that doesn't do anything just so that we can have a void return type.
	const deleteProjectRamAssignment = async (token: string, projectId: string, assignmentId: string, expectedVersion?: number) => ApiClient.deleteProjectRamAssignment(projectId, assignmentId, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).then(() => {}).catch(clientErrorHandler);
	const deleteProjectRamAssignmentCircuitBreaker = new CircuitBreaker(deleteProjectRamAssignment);

	// work packages

	const addWorkPackage = async (token: string, projectId: string, dto: AddWorkpackageDto) => ApiClient.addWorkPackage(projectId, dto, createApiRequestOpts(token)).catch(clientErrorHandler);
	const addWorkPackageCircuitBreaker = new CircuitBreaker(addWorkPackage);

	const updateWorkPackage = async (token: string, projectId: string, workpackageId: string, dto: UpdateWorkpackageDto, expectedVersion?: number) => ApiClient.updateWorkPackage(projectId, workpackageId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const updateWorkPackageCircuitBreaker = new CircuitBreaker(updateWorkPackage);

	const listWorkPackages = async (token: string, projectId: string) => ApiClient.listWorkPackages(projectId, createApiRequestOpts(token)).catch(clientErrorHandler);
	const listWorkPackagesCircuitBreaker = new CircuitBreaker(listWorkPackages);

	// any api calls that don't return any content needs to be handled with a .then block first that doesn't do anything just so that we can have a void return type.
	const deleteWorkPackage = async (token: string, projectId: string, workpackageId: string, expectedVersion?: number) => ApiClient.markWorkPackageAsDeleted(projectId, workpackageId, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).then(() => {}).catch(clientErrorHandler);
	const deleteWorkPackageCircuitBreaker = new CircuitBreaker(deleteWorkPackage);

	const findWorkpackageById = async (token: string, projectId: string, workpackageId: string) => ApiClient.findWorkPackageById(projectId, workpackageId, createApiRequestOpts(token)).catch(clientErrorHandler);
	const findWorkPackageByIdCircuitBreaker = new CircuitBreaker(findWorkpackageById);

	// risks

	const addRisk = async (token: string, projectId: string, dto: AddProjectRiskDto) => ApiClient.createProjectRisk(projectId, dto, createApiRequestOpts(token)).catch(clientErrorHandler);
	const addRiskCircuitBreaker = new CircuitBreaker(addRisk);

	const listRisks = async (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[] } }) => ApiClient.listProjectRisks(projectId, options, createApiRequestOpts(token)).catch(clientErrorHandler);
	const listRisksCircuitBreaker = new CircuitBreaker(listRisks);

	const findRiskById = async (token: string, projectId: string, riskId: string, options?: { include?: string[] }) => ApiClient.getProjectRiskById(projectId, riskId, options, createApiRequestOpts(token)).catch(clientErrorHandler);
	const findRiskByIdCircuitBreaker = new CircuitBreaker(findRiskById);

	const updateRisk = async (token: string, projectId: string, riskId: string, dto: UpdateProjectRiskDto, expectedVersion?: number) => ApiClient.updateProjectRisk(projectId, riskId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const updateRiskCircuitBreaker = new CircuitBreaker(updateRisk);

	const getRiskDashboardByProjectHandler = makeEndpointHandler(ApiClient.getRiskDashboardByProject);

	// assumptions

	const addAssumption = async (token: string, projectId: string, dto: AddProjectAssumptionDto) => ApiClient.createProjectAssumption(projectId, dto, createApiRequestOpts(token)).catch(clientErrorHandler);
	const addAssumptionCircuitBreaker = new CircuitBreaker(addAssumption);

	const listAssumptions = async (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[] } }) => ApiClient.listProjectAssumptions(projectId, options, createApiRequestOpts(token)).catch(clientErrorHandler);
	const listAssumptionsCircuitBreaker = new CircuitBreaker(listAssumptions);

	const findAssumptionById = async (token: string, projectId: string, assumptionId: string, options?: { include?: string[] }) => ApiClient.getProjectAssumptionById(projectId, assumptionId, options, createApiRequestOpts(token)).catch(clientErrorHandler);
	const findAssumptionByIdCircuitBreaker = new CircuitBreaker(findAssumptionById);

	const updateAssumption = async (token: string, projectId: string, assumptionId: string, dto: UpdateAssumptionDto, expectedVersion?: number) => ApiClient.updateProjectAssumption(projectId, assumptionId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const updateAssumptionCircuitBreaker = new CircuitBreaker(updateAssumption);

	const getProjectAssumptionDashboardHandler = makeEndpointHandler(ApiClient.getProjectAssumptionsDashboard);

	// issues

	const addIssueFn = async (token: string, projectId: string, dto: AddIssueDto) => ApiClient.createProjectIssue(projectId, dto, createApiRequestOpts(token)).catch(clientErrorHandler);
	const addIssueCircuitBreaker = new CircuitBreaker(addIssueFn);

	const listIssueFn = async (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[] } }) => ApiClient.listProjectIssues(projectId, options, createApiRequestOpts(token)).catch(clientErrorHandler);
	const listIssuesCircuitBreaker = new CircuitBreaker(listIssueFn);

	const getIssueById = async (token: string, projectId: string, issueId: string, options?: { include?: string[] }) => ApiClient.getProjectIssueById(projectId, issueId, options, createApiRequestOpts(token)).catch(clientErrorHandler);
	const findIssueByIdCircuitBreaker = new CircuitBreaker(getIssueById);

	const updateIssueFn = async (token: string, projectId: string, issueId: string, dto: UpdateIssueDto) => ApiClient.updateProjectIssue(projectId, issueId, dto, createApiRequestOpts(token)).catch(clientErrorHandler);
	const updateIssueCircuitBreaker = new CircuitBreaker(updateIssueFn);

	const getProjectIssueDashboardHandler = makeEndpointHandler(ApiClient.getProjectIssueDashboard);

	// dependencies

	const addDependencyFn = async (token: string, projectId: string, dto: AddDependencyDto) => ApiClient.createProjectDependency(projectId, dto, createApiRequestOpts(token)).catch(clientErrorHandler);
	const addDependencyCircuitBreaker = new CircuitBreaker(addDependencyFn);

	const listDependencyFn = async (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[] } }) => ApiClient.listProjectDependencies(projectId, options, createApiRequestOpts(token)).catch(clientErrorHandler);
	const listDependenciesCircuitBreaker = new CircuitBreaker(listDependencyFn);

	const getDependencyById = async (token: string, projectId: string, dependencyId: string, options?: { include?: string[] }) => ApiClient.getProjectDependencyById(projectId, dependencyId, options, createApiRequestOpts(token)).catch(clientErrorHandler);
	const findDependencyByIdCircuitBreaker = new CircuitBreaker(getDependencyById);

	const updatedDependencyFn = async (token: string, projectId: string, dependendcyId: string, dto: UpdateDependencyDto, expectedVersion: number) => ApiClient.updateProjectDependency(projectId, dependendcyId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)).catch(clientErrorHandler);
	const updatedDependencyCircuitBreaker = new CircuitBreaker(updatedDependencyFn);

	const getProjectDependencyDashboardHandler = makeEndpointHandler(ApiClient.getProjectDependencyDashboard);


	const listOrganisationsFn = async (token: string) => await ApiClient.listOrganisations(createApiRequestOpts(token)).catch(clientErrorHandler);
	const listOrganisationsCb = new CircuitBreaker(listOrganisationsFn);

	const findOrganisationByIdHandler = makeEndpointHandler(ApiClient.findOrganisationById);

	// error handler for caught circuit breaker errors.
	// This will handle any thrown errors and return a service unavailable error.

	const handleCircuitBreakerError = makeCircuitBreakerErrorHandler();

	return {

		dashboard: getDashboardFn,

		projects: {
			listProjects: async (token: string, options?: ListProjectOptions) => await listProjectsHandler(options, createApiRequestOpts(token)),
			createProject: async (token: string, dto: CreateProjectDto) => await createProjectHandler(dto, createApiRequestOpts(token)),
			getProjectById: async (token: string, projectId: string) => await getProjectByIdHandler(projectId, createApiRequestOpts(token)),
		},

		obs: {
			listProjectObs: async (token: string, projectId: string) => await listProjectObsHandler(projectId, createApiRequestOpts(token)),
			createProjectObs: async (token: string, projectId: string, dto: CreateProjectObsDto) => await createProjectObsHandler(projectId, dto, createApiRequestOpts(token)),
			addProjectObsElement: async (token: string, projectId: string, dto: AddObsElementDto, expectedVersion?: number) => await addProjectObsElementHandler(projectId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)),
			moveProjectObsElement: async (token: string, projectId: string, elementId: string, dto: MoveObsElementDto, expectedVersion?: number) => await moveProjectObsElementHandler(projectId, elementId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)),
			findProjectObsElement: async (token: string, projectId: string, elementId: string) => await findProjectObsElementHandler(projectId, elementId, createApiRequestOpts(token)),
			updateProjectObsElement: async (token: string, projectId: string, elementId: string, dto: UpdateObsElementDto, expectedVersion?: number) => await updateProjectObsElementHandler(projectId, elementId, dto, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)),
			deleteProjectObsElement: async (token: string, projectId: string, elementId: string, expectedVersion?: number) => await deleteProjectObsElementHandler(projectId, elementId, formatExpectedVersion(expectedVersion), createApiRequestOpts(token)),
		},

		wbs: {
			listProjectWbs: async (token: string, projectId: string) => await listProjectWbsCircuitBreaker.fire(token, projectId).catch(handleCircuitBreakerError),
			createProjectWbs: async (token: string, projectId: string, dto: CreateProjectObsDto) => await createProjectWbsCircuitBreaker.fire(token, projectId, dto).catch(handleCircuitBreakerError),
			addProjectWbsElement: async (token: string, projectId: string, dto: AddWbsElementDto, expectedVersion?: number) => await addProjectWbsElementCircuitBreaker.fire(token, projectId, dto, expectedVersion).catch(handleCircuitBreakerError),
			moveProjectWbsElement: async (token: string, projectId: string, elementId: string, dto: MoveWbsElementDto, expectedVersion?: number) => await moveProjectWbsElementCircuitBreaker.fire(token, projectId, elementId, dto, expectedVersion).catch(handleCircuitBreakerError),
			findProjectWbsElement: async (token: string, projectId: string, elementId: string) => findProjectWbsElementItemCircuitBreaker.fire(token, projectId, elementId).catch(handleCircuitBreakerError),
			updateProjectWbsElement: async (token: string, projectId: string, elementId: string, dto: UpdateWbsElementDto, expectedVersion?: number) => updateProjectWbsElementCircuitBreaker.fire(token, projectId, elementId, dto, expectedVersion).catch(handleCircuitBreakerError),
			deleteProjectWbsElement: async (token: string, projectId: string, elementId: string, expectedVersion?: number) => deleteProjectWbsElementCircuitBreaker.fire(token, projectId, elementId, expectedVersion).catch(handleCircuitBreakerError),
		},

		rbs: {
			listProjectRbs: async (token: string, projectId: string) => await listProjectRbsCircuitBreaker.fire(token, projectId).catch(handleCircuitBreakerError),
			createProjectRbs: async (token: string, projectId: string, dto: CreateProjectRbsDto) => await createProjectRbsCircuitBreaker.fire(token, projectId, dto).catch(handleCircuitBreakerError),
			addProjectRbsElement: async (token: string, projectId: string, dto: AddRbsElementDto, expectedVersion?: number) => await addProjectRbsElementCircuitBreaker.fire(token, projectId, dto, expectedVersion).catch(handleCircuitBreakerError),
			moveProjectRbsElement: async (token: string, projectId: string, elementId: string, dto: MoveRbsElementDto, expectedVersion?: number) => await moveProjectRbsElementCircuitBreaker.fire(token, projectId, elementId, dto, expectedVersion).catch(handleCircuitBreakerError),
			findProjectRbsElement: async (token: string, projectId: string, elementId: string) => findProjectRbsElementItemCircuitBreaker.fire(token, projectId, elementId).catch(handleCircuitBreakerError),
			updateProjectRbsElement: async (token: string, projectId: string, elementId: string, dto: UpdateRbsElementDto, expectedVersion?: number) => updateProjectRbsElementCircuitBreaker.fire(token, projectId, elementId, dto, expectedVersion).catch(handleCircuitBreakerError),
			deleteProjectRbsElement: async (token: string, projectId: string, elementId: string, expectedVersion?: number) => deleteProjectRbsElementCircuitBreaker.fire(token, projectId, elementId, expectedVersion).catch(handleCircuitBreakerError),
		},

		ram: {
			createProjectRam: (token: string, projectId: string, dto: CreateProjectRamDto) => createProjectRamCircuitBreaker.fire(token, projectId, dto).catch(handleCircuitBreakerError),
			listProjectRam: (token: string, projectId: string) => listProjectRamCircuitBreaker.fire(token, projectId).catch(handleCircuitBreakerError),
			addProjectRamAssignment: (token: string, projectId: string, dto: AddRamAssignmentDto, expectedVersion?: number) => addProjectRamAssignmentCircuitBreaker.fire(token, projectId, dto, expectedVersion).catch(handleCircuitBreakerError),
			updateProjectRamAssignment: (token: string, projectId: string, assignmentId: string, dto: UpdateRamAssignmentDto, expectedVersion?: number) => updateProjectRamAssignmentCircuitBreaker.fire(token, projectId, assignmentId, dto, expectedVersion).catch(handleCircuitBreakerError),
			deleteProjectRamAssignment: (token: string, projectId: string, assignmentId: string, expectedVersion?: number) => deleteProjectRamAssignmentCircuitBreaker.fire(token, projectId, assignmentId, expectedVersion).catch(handleCircuitBreakerError),
		},

		workpackages: {
			addWorkPackage: (token: string, projectId: string, dto: AddWorkpackageDto) => addWorkPackageCircuitBreaker.fire(token, projectId, dto).catch(handleCircuitBreakerError),
			updateWorkPackage: (token: string, projectId: string, workpackageId: string, dto: UpdateWorkpackageDto, expectedVersion?: number) => updateWorkPackageCircuitBreaker.fire(token, projectId, workpackageId, dto, expectedVersion).catch(handleCircuitBreakerError),
			listWorkPackages: (token: string, projectId: string) => listWorkPackagesCircuitBreaker.fire(token, projectId).catch(handleCircuitBreakerError),
			deleteWorkPackage: (token: string, projectId: string, workpackageId: string, expectedVersion?: number) => deleteWorkPackageCircuitBreaker.fire(token, projectId, workpackageId, expectedVersion).catch(handleCircuitBreakerError),
			getWorkpackageById: (token: string, projectId: string, workpackageId: string) => findWorkPackageByIdCircuitBreaker.fire(token, projectId, workpackageId).catch(handleCircuitBreakerError)
		},

		risks: {
			addRisk: (token: string, projectId: string, dto: AddProjectRiskDto) => addRiskCircuitBreaker.fire(token, projectId, dto).catch(handleCircuitBreakerError),
			listRisks: (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[] } }) => listRisksCircuitBreaker.fire(token, projectId, options).catch(handleCircuitBreakerError),
			getRisk: (token: string, projectId: string, riskId: string, options?: { include?: string[] }) => findRiskByIdCircuitBreaker.fire(token, projectId, riskId, options).catch(handleCircuitBreakerError),
			updateRisk: (token: string, projectId: string, riskId: string, dto: UpdateProjectRiskDto, expectedVersion: number) => updateRiskCircuitBreaker.fire(token, projectId, riskId, dto, expectedVersion).catch(handleCircuitBreakerError),
			getProjectDashboard: async (token: string, projectId: string, periodStart: number, periodEnd: number) => await getRiskDashboardByProjectHandler(projectId, periodStart, periodEnd, createApiRequestOpts(token))
		},

		assumptions: {
			addAssumption: (token: string, projectId: string, dto: AddProjectAssumptionDto) => addAssumptionCircuitBreaker.fire(token, projectId, dto).catch(handleCircuitBreakerError),
			listAssumptions: (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[] } }) => listAssumptionsCircuitBreaker.fire(token, projectId, options).catch(handleCircuitBreakerError),
			getAssumption: (token: string, projectId: string, assumptionId: string, options?: { include?: string[] }) => findAssumptionByIdCircuitBreaker.fire(token, projectId, assumptionId, options).catch(handleCircuitBreakerError),
			updateAssumption: (token: string, projectId: string, assumptionId: string, dto: UpdateAssumptionDto, expectedVersion?: number) => updateAssumptionCircuitBreaker.fire(token, projectId, assumptionId, dto, expectedVersion).catch(handleCircuitBreakerError),
			getProjectDashboard: async (token: string, projectId: string, closeoutByLimit?: number) => await ApiClient.getProjectAssumptionsDashboard(projectId, { closeoutByLimit }, createApiRequestOpts(token))
		},

		issues: {
			add: (token: string, projectId: string, dto: AddIssueDto) => addIssueCircuitBreaker.fire(token, projectId, dto).catch(handleCircuitBreakerError),
			list: (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[] } }) => listIssuesCircuitBreaker.fire(token, projectId, options).catch(handleCircuitBreakerError),
			getById: (token: string, projectId: string, issueId: string, options?: { include?: string[] }) => findIssueByIdCircuitBreaker.fire(token, projectId, issueId, options).catch(handleCircuitBreakerError),
			update: (token: string, projectId: string, issueId: string, dto: UpdateIssueDto) => updateIssueCircuitBreaker.fire(token, projectId, issueId, dto).catch(handleCircuitBreakerError),
			getProjectDashboard: async (token: string, projectId: string, periodStart: number, periodEnd: number) => await getProjectIssueDashboardHandler(projectId, periodStart, periodEnd, createApiRequestOpts(token)),
		},

		dependencies: {
			add: (token: string, projectId: string, dto: AddDependencyDto) => addDependencyCircuitBreaker.fire(token, projectId, dto).catch(handleCircuitBreakerError),
			list: (token: string, projectId: string, options?: { workpackageId?: string; include?: string[]; filter?: { status?: string[] } }) => listDependenciesCircuitBreaker.fire(token, projectId, options).catch(handleCircuitBreakerError),
			getById: (token: string, projectId: string, dependencyId: string, options?: { include?: string[] }) => findDependencyByIdCircuitBreaker.fire(token, projectId, dependencyId, options).catch(handleCircuitBreakerError),
			update: (token: string, projectId: string, dependencyId: string, dto: UpdateDependencyDto, expectedVersion: number) => updatedDependencyCircuitBreaker.fire(token, projectId, dependencyId, dto, expectedVersion).catch(handleCircuitBreakerError),
			getProjectDashboard: async (token: string, projectId: string, requiredAtLimit?: number) => await getProjectDependencyDashboardHandler(projectId, { requiredAtLimit }, createApiRequestOpts(token)),
		},

		organisations: {
			list: async (token: string) => await listOrganisationsCb.fire(token).catch(circuitBreakerErrorHandler),
			findById: async (token: string, organisationId: string) => await findOrganisationByIdHandler(organisationId, createApiRequestOpts(token))
		}

	};

};

const makeHandler = <TI extends unknown[] = unknown[], TR = unknown>(callback: (...args: TI) => Promise<TR | Error>) => {
	const cb = new CircuitBreaker(async (...args: TI) => {
		return callback(...args).catch(clientErrorHandler);
	});
	return (...args: TI) => cb.fire(...args).catch(circuitBreakerErrorHandler);
};

/**
 * HttpError errors will be parsed and returned to the calling function to deal with.
 * These will include Validation, Not Found, etc. FetchError's will be normalised into
 * standard errors then thrown and all other errors will be thrown as is. All functions
 * are wrapped by a circuit breaker and the circuit breaker will deal with all thrown
 * errors.
 */
function clientErrorHandler(error: Error): Error {
	debug('API client threw error: ', error.message);
	if (error instanceof ApiClient.HttpError) {
		return parseClientError(error);
	}
	// throw these errors for the circuit breaker to handle...
	if (error instanceof FetchError) {
		throw parseAdapterError(error);
	}
	throw error;
}

const createUndefinedErrorData = (status: HTTP_STATUS_CODES) => ({
  status,
  title: 'Projects API Server Error',
  detail: 'The server did not provide an error response'
});

function parseClientError(error: ApiClient.HttpError): DomainError {
	const errors: ErrorObject[] = error.data === undefined ? [ createUndefinedErrorData(error.status) ] : (<SerializedErrorPayload>error.data).errors;
		if (error.status === HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY) {
			const attributeErrors = <DomainAttributeError[]>errors.map(deserializeErrorObject);
			return createDomainValidationError('There are validation errors', attributeErrors);
		} else {
			return deserializeErrorObject(errors[0]);
		}
}

/**
 * The error handler will handle thrown errors from the client. It will check
 * for errors that require user input, i.e. 400 <= Status < 500 and those that
 * indicate that the circuit breaker should handle Status >= 500...
 * @param logger
 */
function makeCircuitBreakerErrorHandler() {
	return function(error: Error) {
		debug('Circuit Breaker Threw Error: ', error.message);
		return new DomainServiceUnavailableError('The service is unavailable', error);
	};
}

function circuitBreakerErrorHandler(error: Error) {
	return new DomainServiceUnavailableError('The service is unavailable', error);
}
