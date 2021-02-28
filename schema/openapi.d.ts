import {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
  namespace Parameters {
    namespace AssignmentId {
      export type AssignmentId = string; // uuid
    }
    namespace AssumptionId {
      export type AssumptionId = string; // uuid
    }
    namespace DependencyId {
      export type DependencyId = string; // uuid
    }
    namespace ElementId {
      export type ElementId = string; // uuid
    }
    namespace ExpectedVersion {
      export type XExpectedVersion = number;
    }
    namespace Filter {
      export interface Filter {
        status?: string[];
      }
    }
    namespace Include {
      export type Include = string[];
    }
    namespace InvitationIdParam {
      export type InvitationId = string; // uuid
    }
    namespace IssueId {
      export type IssueId = string; // uuid
    }
    namespace OrganisationIdParam {
      export type OrganisationId = string; // uuid
    }
    namespace PaginationQueryParam {
      export interface Page {
        /**
         * Specify the number of records to return in a page. The default is 100. 0 returns all records.
         */
        size?: number;
        number?: number;
      }
    }
    namespace PeriodEndQuery {
      export type PeriodEnd = number;
    }
    namespace PeriodIntervalQuery {
      export type Interval = number;
    }
    namespace PeriodStartQuery {
      export type PeriodStart = number;
    }
    namespace ProjectId {
      export type ProjectId = string; // uuid
    }
    namespace RequiredAtLimitQueryParam {
      export type RequiredAtLimit = number;
    }
    namespace RiskId {
      export type RiskId = string; // uuid
    }
    namespace WorkpackageId {
      export type WorkpackageId = string; // uuid
    }
    namespace WorkpackageIdQuery {
      export type WorkpackageId = string; // uuid
    }
  }
  namespace Responses {
    export type ValidationErrorResponse = Schemas.ErrorObject;
  }
  namespace Schemas {
    export interface AcceptInvitationDto {
      user_id?: string; // uuid
    }
    export interface AddInvitationDto {
      invitation_id?: string; // uuid
      email: string; // email
      role: TeamMemberRoleEnum;
      message: string | null;
    }
    export interface AddObsElementDto {
      /**
       * A unique code to represent the OBS element.
       */
      code: string;
      /**
       * A unique role name
       */
      role: string;
      /**
       * A brief description of the role.
       */
      description?: string;
      /**
       * The ID of the parent element
       */
      parent_id?: string; // uuid
      /**
       * A number indicating where the element will be displayed amongst its siblings. Defaults to the last position
       */
      position?: number;
    }
    export interface AddRamAssignmentDto {
      /**
       * The ID of the WBS deliverable
       */
      wbs_element_id: string; // uuid
      /**
       * The ID of the OBS role
       */
      obs_element_id: string; // uuid
      assignment: RamAssignmentEnum;
    }
    export interface AddRbsElementDto {
      /**
       * A unique code to represent the RBS element.
       */
      code: string;
      /**
       * A unique name for the element
       */
      name: string;
      /**
       * A brief description of the element.
       */
      description?: string;
      /**
       * The ID of the parent element
       */
      parent_id?: string; // uuid
      /**
       * A number indicating where the element will be displayed amongst its siblings. Defaults to the last position
       */
      position?: number;
    }
    export interface AddWbsElementDto {
      /**
       * A unique code to represent the WBS element.
       */
      code: string;
      /**
       * A unique name for the element
       */
      name: string;
      /**
       * A brief description of the element.
       */
      description?: string;
      /**
       * The ID of the parent element
       */
      parent_id?: string; // uuid
      /**
       * A number indicating where the element will be displayed amongst its siblings. Defaults to the last position
       */
      position?: number;
    }
    export interface AddWorkpackageDto {
      wbs_element_id: string; // uuid
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
    }
    export interface AssumptionDashboardEntity {
      by_status: AssumptionsByStatusEntity[];
      by_rating: AssumptionsByRatingEntity[];
      open: AssumptionEntity[];
    }
    export interface AssumptionEntity {
      assumption_id: string; // uuid
      project_id: string; // uuid
      workpackage_id?: string; // uuid
      rbs_element_id?: string; // uuid
      assumption_number: number;
      name: string;
      status: AssumptionStatusEnum;
      description?: string;
      reason?: string;
      closeout_by?: null | number;
      closed_at?: null | number;
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
    }
    export type AssumptionImpactEnum = "None" | "Negligible" | "Minor" | "Moderate" | "Major" | "Severe";
    export type AssumptionRatingEnum = "Very High" | "High" | "Moderate" | "Low" | "Very Low" | "None";
    export type AssumptionStatusEnum = "Proposed" | "Open" | "Closed" | "Rejected" | "Deleted";
    export interface AssumptionsByRatingEntity {
      incorrect_rating: AssumptionRatingEnum;
      count: number;
    }
    export interface AssumptionsByStatusEntity {
      status: AssumptionStatusEnum;
      count: number;
    }
    export interface CreateAssumptionDto {
      workpackage_id?: string; // uuid
      rbs_element_id?: string; // uuid
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
    }
    export interface CreateDependencyDto {
      workpackage_id?: string; // uuid
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
    }
    export interface CreateIssueDto {
      workpackage_id?: string; // uuid
      name: string;
      status: IssueStatusEnum;
      description?: string;
      started_at?: number;
      expected_at?: number;
      closed_at?: number;
      caused_by?: IssueCauseEnum;
      assumption_id?: string; // uuid
      risk_id?: string; // uuid
      dependency_id?: string; // uuid
      actions?: string;
      effect?: string;
      schedule_impact: IssueImpactEnum;
      cost_impact: IssueImpactEnum;
      safety_impact: IssueImpactEnum;
      quality_impact: IssueImpactEnum;
      reputation_impact: IssueImpactEnum;
    }
    export interface CreateObsDto {
      method: "empty" | "upload" | "template" | "copy";
      templateName?: string;
      projectIdToCopy?: string; // uuid
      data?: CreateObsElementData[];
    }
    export interface CreateObsElementData {
      code: string;
      role: string;
      description?: string;
      children?: CreateObsElementData[];
    }
    export interface CreateProjectDto {
      name: string;
      description?: string;
      status: ProjectStatusEnum;
      organisation_id: string; // uuid
      friendly_id?: string;
      initialise?: boolean;
      settings?: {
        risk?: ProjectRiskSettings;
      };
    }
    export interface CreateRamDto {
      method: "empty" | "upload";
      data?: {
      };
    }
    export interface CreateRbsDto {
      method: "empty" | "upload" | "template" | "copy";
      template_name?: string;
      project_id_to_copy?: string; // uuid
      data?: {
      };
    }
    export interface CreateRiskDto {
      name: string;
      workpackage_id?: string; // uuid
      rbs_element_id?: string; // uuid
      description?: string;
      type: RiskTypeEnum;
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
    }
    export interface CreateWbsDto {
      method: "empty" | "upload" | "template" | "copy";
      template_name?: string;
      project_id_to_copy?: string; // uuid
      data?: {
      };
    }
    export interface DependenciesByRatingEntity {
      late_delivery_rating: LateDependencyRatingEnum;
      count: number;
    }
    export interface DependenciesByStatusEntity {
      status: DependencyStatusEnum;
      count: number;
    }
    export interface DependencyDashboardEntity {
      by_status: DependenciesByStatusEntity[];
      by_rating: DependenciesByRatingEntity[];
      open: DependencyEntity[];
    }
    export interface DependencyEntity {
      dependency_id: string; // uuid
      project_id: string; // uuid
      workpackage_id?: string; // uuid
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
    }
    export type DependencyStatusEnum = "Proposed" | "Open" | "Delivered" | "Accepted" | "Rejected" | "Cancelled" | "Deleted";
    export interface ErrorObject {
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
    }
    export interface InvitationEntity {
      invitation_id: string; // uuid
      organisation_id: string; // uuid
      organisation_name: string;
      email: string; // email
      role: TeamMemberRoleEnum;
      message: string | null;
      status: InvitationStatusEnum;
      status_description: string | null;
      user_id: string | null; // uuid
      created_at: number;
      updated_at: number;
      version: number;
    }
    export type InvitationStatusEnum = "Pending" | "Sent" | "Failed" | "Accepted" | "Rejected" | "Cancelled";
    export type IssueCauseEnum = "Risk" | "Assumption" | "Dependency" | "Other";
    export interface IssueDashboardEntity {
      count_by_status: {
        status: IssueStatusEnum;
        count: number;
      }[];
      count_by_rating: {
        issue_rating: IssueRatingEnum;
        count: number;
      }[];
      period_issues: IssueEntity[];
    }
    export interface IssueEntity {
      issue_id: string; // uuid
      project_id: string; // uuid
      workpackage_id: string | null; // uuid
      issue_number: number;
      name: string;
      status: IssueStatusEnum;
      description: string | null;
      reason: string | null;
      started_at: number | null;
      expected_at: number | null;
      closed_at: number | null;
      caused_by: IssueCauseEnum;
      assumption_id: string | null; // uuid
      risk_id: string | null; // uuid
      dependency_id: string | null; // uuid
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
    }
    export type IssueImpactEnum = "None" | "Negligible" | "Minor" | "Moderate" | "Major" | "Severe";
    export type IssueRatingEnum = "Very High" | "High" | "Moderate" | "Low" | "Very Low" | "None";
    export type IssueStatusEnum = "Proposed" | "Open" | "Closed" | "Rejected" | "Deleted";
    export type LateDependencyImpactEnum = "None" | "Negligible" | "Minor" | "Moderate" | "Major" | "Severe";
    export type LateDependencyLikelihoodEnum = "Never" | "Rare" | "Unlikely" | "Possible" | "Likely" | "Almost Certain";
    export type LateDependencyRatingEnum = "Very High" | "High" | "Moderate" | "Low" | "Very Low" | "None";
    export interface MetadataObject {
      count: number;
      page: {
        number: number;
        size: number;
      };
    }
    export interface MoveObsElementDto {
      parent_id?: string; // uuid
      position?: number;
    }
    export interface MoveRbsElementDto {
      parent_id?: string; // uuid
      position?: number;
    }
    export interface MoveWbsElementDto {
      parent_id?: string; // uuid
      position?: number;
    }
    export interface ObsElement {
      element_id: string; // uuid
      code: string;
      path: string;
      name: string;
      position: number;
      description?: string;
      parent_id?: string; // uuid
    }
    export interface ObsEntity {
      project_id: string; // uuid
      elements: {
        element_id: string; // uuid
        code: string;
        path: string;
        name: string;
        position: number;
        description?: string;
        parent_id?: string; // uuid
      }[];
      created_at: number;
      updated_at: number;
      version: number;
    }
    export interface OrganisationEntity {
      organisation_id: string; // uuid
      name: string;
      created_at: number;
      updated_at: number;
      version: number;
    }
    export type PeriodRiskQueryAggregate = RiskEntity[];
    export interface ProjectDashboardEntity {
      risks: {
        risks: RiskDashboardEntity;
      };
    }
    export interface ProjectEntity {
      project_id: string; // uuid
      organisation_id?: string; // uuid
      owner_id?: string; // uuid
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
    }
    export interface ProjectRiskSettings {
      /**
       * Sets how the overall risk score will be calculated from the combined impact scores.
       */
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
    }
    export type ProjectStatusEnum = "Proposed" | "Delivering" | "Rejected" | "Completed" | "Deleted" | "Cancelled";
    export interface RamAssignmentEntity {
      assignment_id: string; // uuid
      wbs_element_id: string; // uuid
      obs_element_id: string; // uuid
      assignment: RamAssignmentEnum;
    }
    export type RamAssignmentEnum = "Responsible" | "Accountable" | "Support" | "Consultable" | "Informable";
    export interface RamEntity {
      project_id: string; // uuid
      assignments: {
        assignment_id: string; // uuid
        wbs_element_id: string; // uuid
        obs_element_id: string; // uuid
        assignment: RamAssignmentEnum;
      }[];
      created_at: number;
      updated_at: number;
      version: number;
    }
    export interface RbsElement {
      element_id: string; // uuid
      code: string;
      path: string;
      name: string;
      position: number;
      description?: string;
      parent_id?: string; // uuid
    }
    export interface RbsEntity {
      project_id: string; // uuid
      elements: {
        element_id: string; // uuid
        code: string;
        path: string;
        name: string;
        position: number;
        description?: string;
        parent_id?: string; // uuid
      }[];
      created_at: number;
      updated_at: number;
      version: number;
    }
    export interface RejectInvitationDto {
    }
    export interface RiskDashboardEntity {
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
        type: RiskTypeEnum;
        count: number;
      }[];
      overdue_risks: RiskEntity[];
      by_rating: {
        current_rating: RiskRatingEnum;
        count: number;
      }[];
    }
    export interface RiskEntity {
      risk_id: string; // uuid
      project_id: string; // uuid
      workpackage_id: string | null; // uuid
      risk_number: number;
      rbs_element_id: string | null; // uuid
      name: string;
      description: string | null;
      type: RiskTypeEnum;
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
    }
    export type RiskHeatmapAggregate = {
      impact: RiskImpactEnum;
      never: number;
      rare: number;
      unlikely: number;
      possible: number;
      likely: number;
      almost_certain: number;
    }[];
    export type RiskImpactEnum = "None" | "Negligible" | "Minor" | "Moderate" | "Major" | "Severe";
    export type RiskLikelihoodEnum = "Never" | "Rare" | "Unlikely" | "Possible" | "Likely" | "Almost Certain";
    export type RiskRatingEnum = "Very High" | "High" | "Moderate" | "Low" | "Very Low" | "None";
    export type RiskResponseEnum = "Avoid" | "Reduce" | "Transfer" | "Accept";
    export type RiskStatusEnum = "Proposed" | "Open" | "Managed" | "Expired" | "Rejected" | "Impacted" | "Deleted";
    export type RiskTypeEnum = "Threat" | "Opportunity";
    export type TeamMemberRoleEnum = "Admininstrator" | "Executive" | "Team Member";
    export interface UpdateAssumptionDto {
      workpackage_id?: string | null; // uuid
      rbs_element_id?: string | null; // uuid
      name?: string;
      status?: AssumptionStatusEnum;
      description?: string | null; // uuid
      reason?: string | null; // uuid
      closeout_by?: null | number;
      closed_at?: null | number;
      actions?: string | null;
      incorrect_effect?: string | null;
      incorrect_schedule_impact?: AssumptionImpactEnum | null;
      incorrect_cost_impact?: AssumptionImpactEnum | null;
      incorrect_safety_impact?: AssumptionImpactEnum | null;
      incorrect_quality_impact?: AssumptionImpactEnum | null;
      incorrect_reputation_impact?: AssumptionImpactEnum | null;
    }
    export interface UpdateDependencyDto {
      name?: string;
      status?: DependencyStatusEnum;
      workpackage_id?: string | null; // uuid
      description?: string | null;
      required_at?: number | null;
      expected_at?: number | null;
      actions?: string | null;
      late_cost_impact?: LateDependencyImpactEnum;
      late_schedule_impact?: LateDependencyImpactEnum;
      late_quality_impact?: LateDependencyImpactEnum;
      late_reputation_impact?: LateDependencyImpactEnum;
      late_safety_impact?: LateDependencyImpactEnum;
    }
    export interface UpdateIssueDto {
      name?: string;
      status?: IssueStatusEnum;
      description?: string | null;
      started_at?: number | null;
      expected_at?: number | null;
      closed_at?: number | null;
      caused_by?: IssueCauseEnum;
      workpackage_id?: string | null; // uuid
      assumption_id?: string | null; // uuid
      risk_id?: string | null; // uuid
      dependency_id?: string | null; // uuid
      actions?: string | null;
      effect?: string | null;
      schedule_impact?: IssueImpactEnum;
      cost_impact?: IssueImpactEnum;
      safety_impact?: IssueImpactEnum;
      quality_impact?: IssueImpactEnum;
      reputation_impact?: IssueImpactEnum;
    }
    export interface UpdateObsElementDto {
      code?: string;
      role?: string;
      description?: string;
    }
    export interface UpdateRamAssignmentDto {
      assignment: RamAssignmentEnum;
    }
    export interface UpdateRbsElementDto {
      code?: string;
      name?: string;
      description?: string;
    }
    export interface UpdateRiskDto {
      name?: string;
      workpackage_id?: string | null; // uuid
      rbs_element_id?: string | null; // uuid
      description?: string | null;
      type?: RiskTypeEnum;
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
    }
    export interface UpdateWbsElementDto {
      code?: string;
      name?: string;
      description?: string;
    }
    export interface UpdateWorkpackageDto {
      friendly_id?: string;
      title?: string;
      status?: WorkpackageStatusEnum;
      wbs_element_id?: string | null; // uuid
      purpose?: string | null;
      description?: string | null;
      includes?: string | null;
      excludes?: string | null;
      commencement_criteria?: string | null;
      completion_criteria?: string | null;
      references?: string | null;
    }
    export interface UserDashboardEntity {
    }
    export interface WbsElement {
      element_id: string; // uuid
      code: string;
      path: string;
      name: string;
      position: number;
      description?: string;
      parent_id?: string; // uuid
    }
    export interface WbsEntity {
      project_id: string; // uuid
      elements: {
        element_id: string; // uuid
        code: string;
        path: string;
        name: string;
        position: number;
        description?: string;
        parent_id?: string; // uuid
      }[];
      created_at: number;
      updated_at: number;
      version: number;
    }
    export interface WorkpackageEntity {
      workpackage_id: string; // uuid
      project_id: string; // uuid
      wbs_element_id: string; // uuid
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
    }
    export type WorkpackageStatusEnum = "Proposed" | "Approved" | "Delivering" | "Completed" | "Rejected" | "Deleted";
  }
}
declare namespace Paths {
  namespace AcceptInvitation {
    export type RequestBody = Components.Schemas.AcceptInvitationDto;
    namespace Responses {
      export type $200 = Components.Schemas.InvitationEntity;
    }
  }
  namespace AddInvitation {
    export type RequestBody = Components.Schemas.AddInvitationDto;
    namespace Responses {
      export type $201 = Components.Schemas.InvitationEntity;
    }
  }
  namespace AddProjectObsElement {
    export type RequestBody = Components.Schemas.AddObsElementDto;
    namespace Responses {
      export type $201 = Components.Schemas.ObsElement;
    }
  }
  namespace AddProjectRamAssignment {
    export type RequestBody = Components.Schemas.AddRamAssignmentDto;
    namespace Responses {
      export type $201 = Components.Schemas.RamAssignmentEntity;
    }
  }
  namespace AddProjectRbsElement {
    export type RequestBody = Components.Schemas.AddRbsElementDto;
    namespace Responses {
      export type $201 = Components.Schemas.RbsElement;
    }
  }
  namespace AddProjectWbsElement {
    export type RequestBody = Components.Schemas.AddWbsElementDto;
    namespace Responses {
      export type $201 = Components.Schemas.WbsElement;
    }
  }
  namespace AddWorkPackage {
    export type RequestBody = Components.Schemas.AddWorkpackageDto;
    namespace Responses {
      export type $200 = Components.Schemas.WorkpackageEntity;
    }
  }
  namespace CreateProject {
    export type RequestBody = Components.Schemas.CreateProjectDto;
    namespace Responses {
      export type $201 = Components.Schemas.ProjectEntity;
    }
  }
  namespace CreateProjectAssumption {
    export type RequestBody = Components.Schemas.CreateAssumptionDto;
    namespace Responses {
      export type $201 = Components.Schemas.AssumptionEntity;
    }
  }
  namespace CreateProjectDependency {
    export type RequestBody = Components.Schemas.CreateDependencyDto;
    namespace Responses {
      export type $201 = Components.Schemas.DependencyEntity;
    }
  }
  namespace CreateProjectIssue {
    export type RequestBody = Components.Schemas.CreateIssueDto;
    namespace Responses {
      export type $201 = Components.Schemas.IssueEntity;
    }
  }
  namespace CreateProjectObs {
    export type RequestBody = Components.Schemas.CreateObsDto;
    namespace Responses {
      export type $201 = Components.Schemas.ObsEntity;
    }
  }
  namespace CreateProjectRam {
    export type RequestBody = Components.Schemas.CreateRamDto;
    namespace Responses {
      export type $201 = Components.Schemas.RamEntity;
    }
  }
  namespace CreateProjectRbs {
    export type RequestBody = Components.Schemas.CreateRbsDto;
    namespace Responses {
      export type $201 = Components.Schemas.RbsEntity;
    }
  }
  namespace CreateProjectRisk {
    export type RequestBody = Components.Schemas.CreateRiskDto;
    namespace Responses {
      export type $201 = Components.Schemas.RiskEntity;
    }
  }
  namespace CreateProjectWbs {
    export type RequestBody = Components.Schemas.CreateWbsDto;
    namespace Responses {
      export type $201 = Components.Schemas.WbsEntity;
    }
  }
  namespace FindOrganisationById {
    namespace Responses {
      export type $200 = Components.Schemas.OrganisationEntity;
    }
  }
  namespace FindProjectObsElement {
    namespace Responses {
      export type $200 = Components.Schemas.ObsElement;
    }
  }
  namespace FindProjectRbsElement {
    namespace Responses {
      export type $200 = Components.Schemas.RbsElement;
    }
  }
  namespace FindProjectWbsElement {
    namespace Responses {
      export type $200 = Components.Schemas.WbsElement;
    }
  }
  namespace FindWorkPackageById {
    namespace Responses {
      export type $200 = Components.Schemas.WorkpackageEntity;
    }
  }
  namespace GetProjectAssumptionById {
    namespace Responses {
      export type $200 = Components.Schemas.AssumptionEntity;
    }
  }
  namespace GetProjectAssumptionsDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.AssumptionDashboardEntity;
    }
  }
  namespace GetProjectById {
    namespace Responses {
      export type $200 = Components.Schemas.ProjectEntity;
    }
  }
  namespace GetProjectDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.ProjectDashboardEntity;
    }
  }
  namespace GetProjectDependencyById {
    namespace Responses {
      export type $200 = Components.Schemas.DependencyEntity;
    }
  }
  namespace GetProjectDependencyDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.DependencyDashboardEntity;
    }
  }
  namespace GetProjectIssueById {
    namespace Responses {
      export type $200 = Components.Schemas.IssueEntity;
    }
  }
  namespace GetProjectIssueDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.IssueDashboardEntity;
    }
  }
  namespace GetProjectRiskById {
    namespace Responses {
      export type $200 = Components.Schemas.RiskEntity;
    }
  }
  namespace GetRiskDashboardByProject {
    namespace Responses {
      export type $200 = Components.Schemas.RiskDashboardEntity;
    }
  }
  namespace GetUserDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.UserDashboardEntity;
    }
  }
  namespace ListOrganisations {
    namespace Responses {
      export type $200 = Components.Schemas.OrganisationEntity[];
    }
  }
  namespace ListProjectAssumptions {
    namespace Responses {
      export type $200 = Components.Schemas.AssumptionEntity[];
    }
  }
  namespace ListProjectDependencies {
    namespace Responses {
      export type $200 = Components.Schemas.DependencyEntity[];
    }
  }
  namespace ListProjectIssues {
    namespace Responses {
      export type $200 = Components.Schemas.IssueEntity[];
    }
  }
  namespace ListProjectObs {
    namespace Responses {
      export type $200 = Components.Schemas.ObsEntity;
    }
  }
  namespace ListProjectRam {
    namespace Responses {
      export type $200 = Components.Schemas.RamEntity;
    }
  }
  namespace ListProjectRbs {
    namespace Responses {
      export type $200 = Components.Schemas.RbsEntity;
    }
  }
  namespace ListProjectRisks {
    namespace Responses {
      export type $200 = Components.Schemas.RiskEntity[];
    }
  }
  namespace ListProjectWbs {
    namespace Responses {
      export type $200 = Components.Schemas.WbsEntity;
    }
  }
  namespace ListProjects {
    namespace Responses {
      export type $200 = Components.Schemas.ProjectEntity[];
    }
  }
  namespace ListWorkPackages {
    namespace Responses {
      export type $200 = Components.Schemas.WorkpackageEntity[];
    }
  }
  namespace MoveProjectObsElement {
    export type RequestBody = Components.Schemas.MoveObsElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.ObsElement;
    }
  }
  namespace MoveProjectRbsElement {
    export type RequestBody = Components.Schemas.MoveRbsElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.RbsElement;
    }
  }
  namespace MoveProjectWbsElement {
    export type RequestBody = Components.Schemas.MoveWbsElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.WbsElement;
    }
  }
  namespace Projects {
    namespace Parameters {
      export interface Filter {
        organisation_id?: string; // uuid
      }
    }
    export interface QueryParameters {
      filter?: Parameters.Filter;
    }
  }
  namespace Projects$ProjectIdAssumptions {
    namespace Parameters {
      export type WorkpackageId = string; // uuid
    }
    export interface QueryParameters {
      workpackage_id?: Parameters.WorkpackageId; // uuid
    }
  }
  namespace Projects$ProjectIdAssumptionsDashboard {
    namespace Parameters {
      export type CloseoutByLimit = number;
    }
    export interface QueryParameters {
      closeoutByLimit?: Parameters.CloseoutByLimit;
    }
  }
  namespace Projects$ProjectIdDependencies {
    namespace Parameters {
      export type WorkpackageId = string; // uuid
    }
    export interface QueryParameters {
      workpackage_id?: Parameters.WorkpackageId; // uuid
    }
  }
  namespace Projects$ProjectIdIssues {
    namespace Parameters {
      export type WorkpackageId = string; // uuid
    }
    export interface QueryParameters {
      workpackage_id?: Parameters.WorkpackageId; // uuid
    }
  }
  namespace RejectInvitation {
    export type RequestBody = Components.Schemas.RejectInvitationDto;
    namespace Responses {
      export type $200 = Components.Schemas.InvitationEntity;
    }
  }
  namespace UpdateProjectAssumption {
    export type RequestBody = Components.Schemas.UpdateAssumptionDto;
    namespace Responses {
      export type $200 = Components.Schemas.AssumptionEntity;
    }
  }
  namespace UpdateProjectDependency {
    export type RequestBody = Components.Schemas.UpdateDependencyDto;
    namespace Responses {
      export type $200 = Components.Schemas.DependencyEntity;
    }
  }
  namespace UpdateProjectIssue {
    export type RequestBody = Components.Schemas.UpdateIssueDto;
    namespace Responses {
      export type $200 = Components.Schemas.IssueEntity;
    }
  }
  namespace UpdateProjectObsElement {
    export type RequestBody = Components.Schemas.UpdateObsElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.ObsElement;
    }
  }
  namespace UpdateProjectRamAssignment {
    export type RequestBody = Components.Schemas.UpdateRamAssignmentDto;
    namespace Responses {
      export type $200 = Components.Schemas.RamAssignmentEntity;
    }
  }
  namespace UpdateProjectRbsElement {
    export type RequestBody = Components.Schemas.UpdateWbsElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.RbsElement;
    }
  }
  namespace UpdateProjectRisk {
    export type RequestBody = Components.Schemas.UpdateRiskDto;
    namespace Responses {
      export type $200 = Components.Schemas.RiskEntity;
    }
  }
  namespace UpdateProjectWbsElement {
    export type RequestBody = Components.Schemas.UpdateWbsElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.WbsElement;
    }
  }
  namespace UpdateWorkPackage {
    export type RequestBody = Components.Schemas.UpdateWorkpackageDto;
    namespace Responses {
      export type $200 = Components.Schemas.WorkpackageEntity;
    }
  }
}

export interface OperationMethods {
  /**
   * listProjectAssumptions
   */
  'listProjectAssumptions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectAssumptions.Responses.$200>
  /**
   * GetProjectAssumptionsDashboard
   */
  'GetProjectAssumptionsDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectAssumptionsDashboard.Responses.$200>
  /**
   * createProjectAssumption
   */
  'createProjectAssumption'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateProjectAssumption.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateProjectAssumption.Responses.$201>
  /**
   * getProjectAssumptionById
   */
  'getProjectAssumptionById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectAssumptionById.Responses.$200>
  /**
   * updateProjectAssumption
   */
  'updateProjectAssumption'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateProjectAssumption.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProjectAssumption.Responses.$200>
  /**
   * GetUserDashboard
   */
  'GetUserDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserDashboard.Responses.$200>
  /**
   * listProjectDependencies
   */
  'listProjectDependencies'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectDependencies.Responses.$200>
  /**
   * GetProjectDependencyDashboard
   */
  'GetProjectDependencyDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectDependencyDashboard.Responses.$200>
  /**
   * createProjectDependency
   */
  'createProjectDependency'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateProjectDependency.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateProjectDependency.Responses.$201>
  /**
   * getProjectDependencyById
   */
  'getProjectDependencyById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectDependencyById.Responses.$200>
  /**
   * updateProjectDependency
   */
  'updateProjectDependency'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateProjectDependency.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProjectDependency.Responses.$200>
  /**
   * listProjectIssues
   */
  'listProjectIssues'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectIssues.Responses.$200>
  /**
   * GetProjectIssueDashboard
   */
  'GetProjectIssueDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectIssueDashboard.Responses.$200>
  /**
   * createProjectIssue
   */
  'createProjectIssue'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateProjectIssue.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateProjectIssue.Responses.$201>
  /**
   * getProjectIssueById
   */
  'getProjectIssueById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectIssueById.Responses.$200>
  /**
   * updateProjectIssue
   */
  'updateProjectIssue'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateProjectIssue.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProjectIssue.Responses.$200>
  /**
   * listProjectObs
   */
  'listProjectObs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectObs.Responses.$200>
  /**
   * CreateProjectObs
   */
  'CreateProjectObs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateProjectObs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateProjectObs.Responses.$201>
  /**
   * addProjectObsElement
   */
  'addProjectObsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddProjectObsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddProjectObsElement.Responses.$201>
  /**
   * findProjectObsElement
   */
  'findProjectObsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FindProjectObsElement.Responses.$200>
  /**
   * moveProjectObsElement
   */
  'moveProjectObsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.MoveProjectObsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MoveProjectObsElement.Responses.$200>
  /**
   * updateProjectObsElement
   */
  'updateProjectObsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateProjectObsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProjectObsElement.Responses.$200>
  /**
   * deleteProjectObsElement
   */
  'deleteProjectObsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * ListOrganisations
   */
  'ListOrganisations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListOrganisations.Responses.$200>
  /**
   * FindOrganisationById
   */
  'FindOrganisationById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FindOrganisationById.Responses.$200>
  /**
   * listProjects
   */
  'listProjects'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjects.Responses.$200>
  /**
   * createProject
   */
  'createProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateProject.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateProject.Responses.$201>
  /**
   * getProjectById
   */
  'getProjectById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectById.Responses.$200>
  /**
   * getProjectDashboard
   */
  'getProjectDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectDashboard.Responses.$200>
  /**
   * listProjectRam
   */
  'listProjectRam'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectRam.Responses.$200>
  /**
   * createProjectRam
   */
  'createProjectRam'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateProjectRam.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateProjectRam.Responses.$201>
  /**
   * addProjectRamAssignment
   */
  'addProjectRamAssignment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddProjectRamAssignment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddProjectRamAssignment.Responses.$201>
  /**
   * updateProjectRamAssignment
   */
  'updateProjectRamAssignment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateProjectRamAssignment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProjectRamAssignment.Responses.$200>
  /**
   * deleteProjectRamAssignment
   */
  'deleteProjectRamAssignment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * listProjectRbs
   */
  'listProjectRbs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectRbs.Responses.$200>
  /**
   * createProjectRbs
   */
  'createProjectRbs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateProjectRbs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateProjectRbs.Responses.$201>
  /**
   * addProjectRbsElement
   */
  'addProjectRbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddProjectRbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddProjectRbsElement.Responses.$201>
  /**
   * findProjectRbsElement
   */
  'findProjectRbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FindProjectRbsElement.Responses.$200>
  /**
   * moveProjectRbsElement
   */
  'moveProjectRbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.MoveProjectRbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MoveProjectRbsElement.Responses.$200>
  /**
   * updateProjectRbsElement
   */
  'updateProjectRbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateProjectRbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProjectRbsElement.Responses.$200>
  /**
   * deleteProjectRbsElement
   */
  'deleteProjectRbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * listProjectRisks
   */
  'listProjectRisks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectRisks.Responses.$200>
  /**
   * GetRiskDashboardByProject
   */
  'GetRiskDashboardByProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRiskDashboardByProject.Responses.$200>
  /**
   * createProjectRisk
   */
  'createProjectRisk'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateProjectRisk.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateProjectRisk.Responses.$201>
  /**
   * getProjectRiskById
   */
  'getProjectRiskById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectRiskById.Responses.$200>
  /**
   * updateProjectRisk
   */
  'updateProjectRisk'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateProjectRisk.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProjectRisk.Responses.$200>
  /**
   * listProjectWbs
   */
  'listProjectWbs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectWbs.Responses.$200>
  /**
   * createProjectWbs
   */
  'createProjectWbs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateProjectWbs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateProjectWbs.Responses.$201>
  /**
   * addProjectWbsElement
   */
  'addProjectWbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddProjectWbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddProjectWbsElement.Responses.$201>
  /**
   * findProjectWbsElement
   */
  'findProjectWbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FindProjectWbsElement.Responses.$200>
  /**
   * moveProjectWbsElement
   */
  'moveProjectWbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.MoveProjectWbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MoveProjectWbsElement.Responses.$200>
  /**
   * updateProjectWbsElement
   */
  'updateProjectWbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateProjectWbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProjectWbsElement.Responses.$200>
  /**
   * deleteProjectWbsElement
   */
  'deleteProjectWbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * ListWorkPackages
   */
  'ListWorkPackages'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListWorkPackages.Responses.$200>
  /**
   * AddWorkPackage
   */
  'AddWorkPackage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddWorkPackage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddWorkPackage.Responses.$200>
  /**
   * FindWorkPackageById
   */
  'FindWorkPackageById'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FindWorkPackageById.Responses.$200>
  /**
   * UpdateWorkPackage
   */
  'UpdateWorkPackage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateWorkPackage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateWorkPackage.Responses.$200>
  /**
   * MarkWorkPackageAsDeleted
   */
  'MarkWorkPackageAsDeleted'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * AddInvitation
   */
  'AddInvitation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddInvitation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddInvitation.Responses.$201>
  /**
   * AcceptInvitation
   */
  'AcceptInvitation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AcceptInvitation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AcceptInvitation.Responses.$200>
  /**
   * RejectInvitation
   */
  'RejectInvitation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RejectInvitation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RejectInvitation.Responses.$200>
}

export interface PathsDictionary {
  ['/projects/{project_id}/assumptions']: {
    /**
     * listProjectAssumptions
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectAssumptions.Responses.$200>
  }
  ['/projects/{project_id}/assumptions/dashboard']: {
    /**
     * GetProjectAssumptionsDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectAssumptionsDashboard.Responses.$200>
  }
  ['/projects/{project_id}/assumptions/add']: {
    /**
     * createProjectAssumption
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateProjectAssumption.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateProjectAssumption.Responses.$201>
  }
  ['/projects/{project_id}/assumptions/{assumption_id}']: {
    /**
     * getProjectAssumptionById
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectAssumptionById.Responses.$200>
  }
  ['/projects/{project_id}/assumptions/{assumption_id}/update']: {
    /**
     * updateProjectAssumption
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateProjectAssumption.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProjectAssumption.Responses.$200>
  }
  ['/dashboard']: {
    /**
     * GetUserDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserDashboard.Responses.$200>
  }
  ['/projects/{project_id}/dependencies']: {
    /**
     * listProjectDependencies
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectDependencies.Responses.$200>
  }
  ['/projects/{project_id}/dependencies/dashboard']: {
    /**
     * GetProjectDependencyDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectDependencyDashboard.Responses.$200>
  }
  ['/projects/{project_id}/dependencies/add']: {
    /**
     * createProjectDependency
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateProjectDependency.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateProjectDependency.Responses.$201>
  }
  ['/projects/{project_id}/dependencies/{dependency_id}']: {
    /**
     * getProjectDependencyById
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectDependencyById.Responses.$200>
  }
  ['/projects/{project_id}/dependencies/{dependency_id}/update']: {
    /**
     * updateProjectDependency
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateProjectDependency.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProjectDependency.Responses.$200>
  }
  ['/projects/{project_id}/issues']: {
    /**
     * listProjectIssues
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectIssues.Responses.$200>
  }
  ['/projects/{project_id}/issues/dashboard']: {
    /**
     * GetProjectIssueDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectIssueDashboard.Responses.$200>
  }
  ['/projects/{project_id}/issues/add']: {
    /**
     * createProjectIssue
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateProjectIssue.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateProjectIssue.Responses.$201>
  }
  ['/projects/{project_id}/issue/{issue_id}']: {
    /**
     * getProjectIssueById
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectIssueById.Responses.$200>
  }
  ['/projects/{project_id}/issues/{issue_id}/update']: {
    /**
     * updateProjectIssue
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateProjectIssue.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProjectIssue.Responses.$200>
  }
  ['/projects/{project_id}/obs']: {
    /**
     * listProjectObs
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectObs.Responses.$200>
  }
  ['/projects/{project_id}/obs/create']: {
    /**
     * CreateProjectObs
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateProjectObs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateProjectObs.Responses.$201>
  }
  ['/projects/{project_id}/obs/add']: {
    /**
     * addProjectObsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddProjectObsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddProjectObsElement.Responses.$201>
  }
  ['/projects/{project_id}/obs/{element_id}']: {
    /**
     * findProjectObsElement
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FindProjectObsElement.Responses.$200>
  }
  ['/projects/{project_id}/obs/{element_id}/move']: {
    /**
     * moveProjectObsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.MoveProjectObsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MoveProjectObsElement.Responses.$200>
  }
  ['/projects/{project_id}/obs/{element_id}/update']: {
    /**
     * updateProjectObsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateProjectObsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProjectObsElement.Responses.$200>
  }
  ['/projects/{project_id}/obs/{element_id}/delete']: {
    /**
     * deleteProjectObsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/organisations']: {
    /**
     * ListOrganisations
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListOrganisations.Responses.$200>
  }
  ['/organisations/{organisation_id}']: {
    /**
     * FindOrganisationById
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FindOrganisationById.Responses.$200>
  }
  ['/projects']: {
    /**
     * listProjects
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjects.Responses.$200>
  }
  ['/projects/create']: {
    /**
     * createProject
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateProject.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateProject.Responses.$201>
  }
  ['/projects/{project_id}']: {
    /**
     * getProjectById
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectById.Responses.$200>
  }
  ['/projects/{project_id}/dashboard']: {
    /**
     * getProjectDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectDashboard.Responses.$200>
  }
  ['/projects/{project_id}/ram']: {
    /**
     * listProjectRam
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectRam.Responses.$200>
  }
  ['/projects/{project_id}/ram/create']: {
    /**
     * createProjectRam
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateProjectRam.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateProjectRam.Responses.$201>
  }
  ['/projects/{project_id}/ram/add']: {
    /**
     * addProjectRamAssignment
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddProjectRamAssignment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddProjectRamAssignment.Responses.$201>
  }
  ['/projects/{project_id}/ram/{assignment_id}/update']: {
    /**
     * updateProjectRamAssignment
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateProjectRamAssignment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProjectRamAssignment.Responses.$200>
  }
  ['/projects/{project_id}/ram/{assignment_id}/delete']: {
    /**
     * deleteProjectRamAssignment
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/projects/{project_id}/rbs']: {
    /**
     * listProjectRbs
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectRbs.Responses.$200>
  }
  ['/projects/{project_id}/rbs/create']: {
    /**
     * createProjectRbs
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateProjectRbs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateProjectRbs.Responses.$201>
  }
  ['/projects/{project_id}/rbs/add']: {
    /**
     * addProjectRbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddProjectRbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddProjectRbsElement.Responses.$201>
  }
  ['/projects/{project_id}/rbs/{element_id}']: {
    /**
     * findProjectRbsElement
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FindProjectRbsElement.Responses.$200>
  }
  ['/projects/{project_id}/rbs/{element_id}/move']: {
    /**
     * moveProjectRbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.MoveProjectRbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MoveProjectRbsElement.Responses.$200>
  }
  ['/projects/{project_id}/rbs/{element_id}/update']: {
    /**
     * updateProjectRbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateProjectRbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProjectRbsElement.Responses.$200>
  }
  ['/projects/{project_id}/rbs/{element_id}/delete']: {
    /**
     * deleteProjectRbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/projects/{project_id}/risks']: {
    /**
     * listProjectRisks
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectRisks.Responses.$200>
  }
  ['/projects/{project_id}/risks/dashboard']: {
    /**
     * GetRiskDashboardByProject
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRiskDashboardByProject.Responses.$200>
  }
  ['/projects/{project_id}/risks/add']: {
    /**
     * createProjectRisk
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateProjectRisk.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateProjectRisk.Responses.$201>
  }
  ['/projects/{project_id}/risks/{risk_id}']: {
    /**
     * getProjectRiskById
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectRiskById.Responses.$200>
  }
  ['/projects/{project_id}/risks/{risk_id}/update']: {
    /**
     * updateProjectRisk
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateProjectRisk.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProjectRisk.Responses.$200>
  }
  ['/projects/{project_id}/wbs']: {
    /**
     * listProjectWbs
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectWbs.Responses.$200>
  }
  ['/projects/{project_id}/wbs/create']: {
    /**
     * createProjectWbs
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateProjectWbs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateProjectWbs.Responses.$201>
  }
  ['/projects/{project_id}/wbs/add']: {
    /**
     * addProjectWbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddProjectWbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddProjectWbsElement.Responses.$201>
  }
  ['/projects/{project_id}/wbs/{element_id}']: {
    /**
     * findProjectWbsElement
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FindProjectWbsElement.Responses.$200>
  }
  ['/projects/{project_id}/wbs/{element_id}/move']: {
    /**
     * moveProjectWbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.MoveProjectWbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MoveProjectWbsElement.Responses.$200>
  }
  ['/projects/{project_id}/wbs/{element_id}/update']: {
    /**
     * updateProjectWbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateProjectWbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProjectWbsElement.Responses.$200>
  }
  ['/projects/{project_id}/wbs/{element_id}/delete']: {
    /**
     * deleteProjectWbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/projects/{project_id}/work-packages']: {
    /**
     * ListWorkPackages
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListWorkPackages.Responses.$200>
  }
  ['/projects/{project_id}/work-packages/add']: {
    /**
     * AddWorkPackage
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddWorkPackage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddWorkPackage.Responses.$200>
  }
  ['/projects/{project_id}/work-packages/{workpackage_id}']: {
    /**
     * FindWorkPackageById
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FindWorkPackageById.Responses.$200>
  }
  ['/projects/{project_id}/work-packages/{workpackage_id}/update']: {
    /**
     * UpdateWorkPackage
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateWorkPackage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateWorkPackage.Responses.$200>
  }
  ['/projects/{project_id}/work-packages/{workpackage_id}/delete']: {
    /**
     * MarkWorkPackageAsDeleted
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/organisations/{organisation_id}/invitations/add']: {
    /**
     * AddInvitation
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddInvitation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddInvitation.Responses.$201>
  }
  ['/invitations/{invitation_id}/accept']: {
    /**
     * AcceptInvitation
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AcceptInvitation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AcceptInvitation.Responses.$200>
  }
  ['/invitations/{invitation_id}/reject']: {
    /**
     * RejectInvitation
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RejectInvitation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RejectInvitation.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
