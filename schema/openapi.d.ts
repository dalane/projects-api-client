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
    namespace OrganisationIdPathParam {
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
    namespace PathAssignmentIds {
      export type AssignmentIds = string; // uuid[]
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
    namespace ProjectIdPathParam {
      export type ProjectId = string; // uuid
    }
    namespace RequiredAtLimitQueryParam {
      export type RequiredAtLimit = number;
    }
    namespace RiskId {
      export type RiskId = string; // uuid
    }
    namespace WorkpackageIdPathParam {
      export type WorkpackageId = string; // uuid
    }
    namespace WorkpackageIdQueryParam {
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
    export interface AddAssumptionDto {
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
    export type AddBreakdownStructureDto = AddUploadedBreakdownStructureDto | AddEmptyBreakdownStructureDto | AddTemplateBreakdownStructureDto | AddCopiedBreakdownStructureDto;
    /**
     * A nested array of breakdown structure elements used when creating a breakdown structure using uploaded data.
     */
    export interface AddBreakdownStructureElementData {
      code: string;
      name: string;
      description?: string;
      children?: AddBreakdownStructureElementData[];
    }
    export interface AddBreakdownStructureElementDto {
      code: string;
      name: string;
      description?: string;
      parent_id?: UUID; // uuid
      position?: number;
    }
    export interface AddCopiedBreakdownStructureDto {
      method: "copy";
      project_id: UUID; // uuid
    }
    export interface AddDependencyDto {
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
    export interface AddEmptyBreakdownStructureDto {
      method: "empty";
    }
    export interface AddInvitationDto {
      invitation_id?: string; // uuid
      email: string; // email
      role: TeamMemberRoleEnum;
      message: string | null;
    }
    export interface AddIssueDto {
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
    export interface AddProjectDto {
      name: string;
      description?: string;
      status: ProjectStatusEnum;
      friendly_id?: string;
      initialise?: boolean;
      settings?: {
        risk?: ProjectRiskSettings;
      };
      owner_id?: string; // uuid
    }
    export interface AddRamAssignmentDto {
      /**
       * The ID of the WBS deliverable
       */
      workpackage_id: string; // uuid
      /**
       * The ID of the OBS role
       */
      obs_element_id: string; // uuid
      assignment: RamAssignmentEnum;
    }
    export interface AddRamDto {
      method: "empty" | "upload";
      data?: {
      };
    }
    export interface AddRiskDto {
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
    export interface AddTemplateBreakdownStructureDto {
      method: "template";
      name: string;
    }
    export interface AddUploadedBreakdownStructureDto {
      method: "upload";
      data: AddBreakdownStructureElementData[];
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
      rbs_element?: BreakdownStructureElementEntity;
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
    export interface BreakdownStructureElementEntity {
      element_id: UUID; // uuid
      code: string;
      name: string;
      position: number;
      description: string | null;
      parent_id: string | null; // uuid
    }
    export interface BreakdownStructureEntity {
      project_id: UUID; // uuid
      elements: BreakdownStructureElementEntity[];
      /**
       * UNIX timestamp of when the entity was created
       */
      created_at: number;
      /**
       * UNIX timestamp of when the entity was updated
       */
      updated_at: number;
      /**
       * The version of the entity
       */
      version: number;
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
    export interface MoveBreakdownStructureElementDto {
      parent_id?: UUID; // uuid
      position?: number;
    }
    export interface OrganisationEntity {
      organisation_id: string; // uuid
      name: string;
      status: OrganisationStatusEnum;
      status_description?: string | null;
      created_at: number;
      updated_at: number;
      version: number;
    }
    export type OrganisationStatusEnum = "Active" | "Suspended";
    export type PeriodRiskQueryAggregate = RiskEntity[];
    export interface ProjectDashboardEntity {
      risks: RiskDashboardEntity;
      assumptions: AssumptionDashboardEntity;
      issues: IssueDashboardEntity;
      dependencies: DependencyDashboardEntity;
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
      workpackage_id: string; // uuid
      obs_element_id: string; // uuid
      assignment: RamAssignmentEnum;
    }
    export type RamAssignmentEnum = "Responsible" | "Accountable" | "Support" | "Consultable" | "Informable";
    export interface RamEntity {
      project_id: string; // uuid
      assignments: RamAssignmentEntity[];
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
      rbs_element?: BreakdownStructureElementEntity;
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
    export type UUID = string; // uuid
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
    export interface UpdateBreakdownStructureElementDto {
      code?: string;
      name?: string;
      description?: string;
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
    export interface UpdateRamAssignmentDto {
      assignment: RamAssignmentEnum;
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
    export type WorkpackageStatusEnum = "Proposed,Approved,Delivering,Completed,Deleted,Rejected";
  }
}
declare namespace Paths {
  namespace AcceptInvitation {
    export type RequestBody = Components.Schemas.AcceptInvitationDto;
    namespace Responses {
      export type $200 = Components.Schemas.InvitationEntity;
    }
  }
  namespace AddAssumption {
    export type RequestBody = Components.Schemas.AddAssumptionDto;
    namespace Responses {
      export type $201 = Components.Schemas.AssumptionEntity;
    }
  }
  namespace AddDependency {
    export type RequestBody = Components.Schemas.AddDependencyDto;
    namespace Responses {
      export type $201 = Components.Schemas.DependencyEntity;
    }
  }
  namespace AddInvitation {
    export type RequestBody = Components.Schemas.AddInvitationDto;
    namespace Responses {
      export type $201 = Components.Schemas.InvitationEntity;
    }
  }
  namespace AddIssue {
    export type RequestBody = Components.Schemas.AddIssueDto;
    namespace Responses {
      export type $201 = Components.Schemas.IssueEntity;
    }
  }
  namespace AddObs {
    export type RequestBody = Components.Schemas.AddBreakdownStructureDto;
    namespace Responses {
      export type $201 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace AddObsElement {
    export type RequestBody = Components.Schemas.AddBreakdownStructureElementDto;
    namespace Responses {
      export type $201 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace AddProject {
    export type RequestBody = Components.Schemas.AddProjectDto;
    namespace Responses {
      export type $201 = Components.Schemas.ProjectEntity;
    }
  }
  namespace AddRam {
    export type RequestBody = Components.Schemas.AddRamDto;
    namespace Responses {
      export type $201 = Components.Schemas.RamEntity;
    }
  }
  namespace AddRamAssignment {
    export type RequestBody = Components.Schemas.AddRamAssignmentDto | Components.Schemas.AddRamAssignmentDto[];
    namespace Responses {
      export type $201 = Components.Schemas.RamAssignmentEntity;
    }
  }
  namespace AddRbs {
    export type RequestBody = Components.Schemas.AddBreakdownStructureDto;
    namespace Responses {
      export type $201 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace AddRbsElement {
    export type RequestBody = Components.Schemas.AddBreakdownStructureElementDto;
    namespace Responses {
      export type $201 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace AddRisk {
    export type RequestBody = Components.Schemas.AddRiskDto;
    namespace Responses {
      export type $201 = Components.Schemas.RiskEntity;
    }
  }
  namespace AddWbs {
    export type RequestBody = Components.Schemas.AddBreakdownStructureDto;
    namespace Responses {
      export type $201 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace AddWbsElement {
    export type RequestBody = Components.Schemas.AddBreakdownStructureElementDto;
    namespace Responses {
      export type $201 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace AddWorkPackage {
    export type RequestBody = Components.Schemas.AddWorkpackageDto;
    namespace Responses {
      export type $200 = Components.Schemas.WorkpackageEntity;
    }
  }
  namespace DeleteObsElement {
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace DeleteRbsElement {
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace DeleteWbsElement {
    namespace Responses {
      export type $204 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace GetAssumption {
    namespace Responses {
      export type $200 = Components.Schemas.AssumptionEntity;
    }
  }
  namespace GetDependency {
    namespace Responses {
      export type $200 = Components.Schemas.DependencyEntity;
    }
  }
  namespace GetIssue {
    namespace Responses {
      export type $200 = Components.Schemas.IssueEntity;
    }
  }
  namespace GetMyDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.UserDashboardEntity;
    }
  }
  namespace GetObs {
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace GetObsElement {
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace GetOrganisation {
    namespace Responses {
      export type $200 = Components.Schemas.OrganisationEntity;
    }
  }
  namespace GetOrganisationRiskDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.RiskDashboardEntity;
    }
  }
  namespace GetProject {
    namespace Responses {
      export type $200 = Components.Schemas.ProjectEntity;
    }
  }
  namespace GetProjectAssumptionDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.AssumptionDashboardEntity;
    }
  }
  namespace GetProjectDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.ProjectDashboardEntity;
    }
  }
  namespace GetProjectDependencyDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.DependencyDashboardEntity;
    }
  }
  namespace GetProjectIssuesDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.IssueDashboardEntity;
    }
  }
  namespace GetProjectRiskDashboard {
    namespace Responses {
      export type $200 = Components.Schemas.RiskDashboardEntity;
    }
  }
  namespace GetRam {
    namespace Responses {
      export type $200 = Components.Schemas.RamEntity;
    }
  }
  namespace GetRbs {
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace GetRbsElement {
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace GetRisk {
    namespace Responses {
      export type $200 = Components.Schemas.RiskEntity;
    }
  }
  namespace GetWbs {
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace GetWbsElement {
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace GetWorkPackage {
    namespace Responses {
      export type $200 = Components.Schemas.WorkpackageEntity;
    }
  }
  namespace ListMyMemberships {
    namespace Responses {
      export type $200 = {
      }[];
    }
  }
  namespace ListMyOrganisations {
    namespace Responses {
      export type $200 = Components.Schemas.OrganisationEntity[];
    }
  }
  namespace ListMyProjects {
    namespace Responses {
      export type $200 = Components.Schemas.ProjectEntity[];
    }
  }
  namespace ListOrganisationProjects {
    namespace Responses {
      export type $200 = Components.Schemas.ProjectEntity[];
    }
  }
  namespace ListOrganisationRisks {
    namespace Responses {
      export type $200 = Components.Schemas.RiskEntity[];
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
  namespace ListProjectRisks {
    namespace Responses {
      export type $200 = Components.Schemas.RiskEntity[];
    }
  }
  namespace ListWorkPackages {
    namespace Responses {
      export type $200 = Components.Schemas.WorkpackageEntity[];
    }
  }
  namespace MoveElement {
    export type RequestBody = Components.Schemas.MoveBreakdownStructureElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace MoveObsElement {
    export type RequestBody = Components.Schemas.MoveBreakdownStructureElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace MoveWbsElement {
    export type RequestBody = Components.Schemas.MoveBreakdownStructureElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace Organisations$OrganisationIdProjectsProjectIdAssumptionsDashboard {
    namespace Parameters {
      export type CloseOutByLimit = number;
    }
    export interface QueryParameters {
      closeOutByLimit?: Parameters.CloseOutByLimit;
    }
  }
  namespace Organisations$OrganisationIdProjectsProjectIdDashboard {
    namespace Parameters {
      export type CloseOutByLimit = number;
    }
    export interface QueryParameters {
      closeOutByLimit?: Parameters.CloseOutByLimit;
    }
  }
  namespace RejectInvitation {
    export type RequestBody = Components.Schemas.RejectInvitationDto;
    namespace Responses {
      export type $200 = Components.Schemas.InvitationEntity;
    }
  }
  namespace UpdateAssumption {
    export type RequestBody = Components.Schemas.UpdateAssumptionDto;
    namespace Responses {
      export type $200 = Components.Schemas.AssumptionEntity;
    }
  }
  namespace UpdateDependency {
    export type RequestBody = Components.Schemas.UpdateDependencyDto;
    namespace Responses {
      export type $200 = Components.Schemas.DependencyEntity;
    }
  }
  namespace UpdateIssue {
    export type RequestBody = Components.Schemas.UpdateIssueDto;
    namespace Responses {
      export type $200 = Components.Schemas.IssueEntity;
    }
  }
  namespace UpdateObsElement {
    export type RequestBody = Components.Schemas.UpdateBreakdownStructureElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace UpdateRamAssignment {
    export type RequestBody = Components.Schemas.UpdateRamAssignmentDto;
    namespace Responses {
      export type $200 = Components.Schemas.RamAssignmentEntity;
    }
  }
  namespace UpdateRbsElement {
    export type RequestBody = Components.Schemas.UpdateBreakdownStructureElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
    }
  }
  namespace UpdateRisk {
    export type RequestBody = Components.Schemas.UpdateRiskDto;
    namespace Responses {
      export type $200 = Components.Schemas.RiskEntity;
    }
  }
  namespace UpdateWbsElement {
    export type RequestBody = Components.Schemas.UpdateBreakdownStructureElementDto;
    namespace Responses {
      export type $200 = Components.Schemas.BreakdownStructureEntity;
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
   * getProjectAssumptionDashboard
   */
  'getProjectAssumptionDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectAssumptionDashboard.Responses.$200>
  /**
   * addAssumption
   */
  'addAssumption'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddAssumption.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddAssumption.Responses.$201>
  /**
   * getAssumption
   */
  'getAssumption'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAssumption.Responses.$200>
  /**
   * updateAssumption
   */
  'updateAssumption'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateAssumption.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateAssumption.Responses.$200>
  /**
   * listProjectDependencies
   */
  'listProjectDependencies'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectDependencies.Responses.$200>
  /**
   * getProjectDependencyDashboard
   */
  'getProjectDependencyDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectDependencyDashboard.Responses.$200>
  /**
   * addDependency
   */
  'addDependency'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddDependency.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddDependency.Responses.$201>
  /**
   * getDependency
   */
  'getDependency'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDependency.Responses.$200>
  /**
   * updateDependency
   */
  'updateDependency'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateDependency.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateDependency.Responses.$200>
  /**
   * listProjectIssues
   */
  'listProjectIssues'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectIssues.Responses.$200>
  /**
   * getProjectIssuesDashboard
   */
  'getProjectIssuesDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectIssuesDashboard.Responses.$200>
  /**
   * addIssue
   */
  'addIssue'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddIssue.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddIssue.Responses.$201>
  /**
   * getIssue
   */
  'getIssue'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetIssue.Responses.$200>
  /**
   * updateIssue
   */
  'updateIssue'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateIssue.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateIssue.Responses.$200>
  /**
   * getObs
   */
  'getObs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetObs.Responses.$200>
  /**
   * addObs
   */
  'addObs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddObs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddObs.Responses.$201>
  /**
   * addObsElement
   */
  'addObsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddObsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddObsElement.Responses.$201>
  /**
   * getObsElement
   */
  'getObsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetObsElement.Responses.$200>
  /**
   * moveObsElement
   */
  'moveObsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.MoveObsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MoveObsElement.Responses.$200>
  /**
   * updateObsElement
   */
  'updateObsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateObsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateObsElement.Responses.$200>
  /**
   * deleteObsElement
   */
  'deleteObsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteObsElement.Responses.$200>
  /**
   * listOrganisations
   */
  'listOrganisations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListOrganisations.Responses.$200>
  /**
   * getOrganisation
   */
  'getOrganisation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrganisation.Responses.$200>
  /**
   * listOrganisationProjects
   */
  'listOrganisationProjects'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListOrganisationProjects.Responses.$200>
  /**
   * addProject
   */
  'addProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddProject.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddProject.Responses.$201>
  /**
   * getProject
   */
  'getProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProject.Responses.$200>
  /**
   * getProjectDashboard
   */
  'getProjectDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectDashboard.Responses.$200>
  /**
   * getRam
   */
  'getRam'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRam.Responses.$200>
  /**
   * addRam
   */
  'addRam'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddRam.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddRam.Responses.$201>
  /**
   * addRamAssignment
   */
  'addRamAssignment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddRamAssignment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddRamAssignment.Responses.$201>
  /**
   * updateRamAssignment
   */
  'updateRamAssignment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateRamAssignment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateRamAssignment.Responses.$200>
  /**
   * deleteRamAssignments
   */
  'deleteRamAssignments'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * getRbs
   */
  'getRbs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRbs.Responses.$200>
  /**
   * addRbs
   */
  'addRbs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddRbs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddRbs.Responses.$201>
  /**
   * addRbsElement
   */
  'addRbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddRbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddRbsElement.Responses.$201>
  /**
   * getRbsElement
   */
  'getRbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRbsElement.Responses.$200>
  /**
   * moveElement
   */
  'moveElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.MoveElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MoveElement.Responses.$200>
  /**
   * updateRbsElement
   */
  'updateRbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateRbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateRbsElement.Responses.$200>
  /**
   * deleteRbsElement
   */
  'deleteRbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteRbsElement.Responses.$200>
  /**
   * listOrganisationRisks
   */
  'listOrganisationRisks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListOrganisationRisks.Responses.$200>
  /**
   * getOrganisationRiskDashboard
   */
  'getOrganisationRiskDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrganisationRiskDashboard.Responses.$200>
  /**
   * listProjectRisks
   */
  'listProjectRisks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectRisks.Responses.$200>
  /**
   * getProjectRiskDashboard
   */
  'getProjectRiskDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectRiskDashboard.Responses.$200>
  /**
   * addRisk
   */
  'addRisk'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddRisk.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddRisk.Responses.$201>
  /**
   * getRisk
   */
  'getRisk'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRisk.Responses.$200>
  /**
   * updateRisk
   */
  'updateRisk'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateRisk.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateRisk.Responses.$200>
  /**
   * getWbs
   */
  'getWbs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWbs.Responses.$200>
  /**
   * addWbs
   */
  'addWbs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddWbs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddWbs.Responses.$201>
  /**
   * addWbsElement
   */
  'addWbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddWbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddWbsElement.Responses.$201>
  /**
   * getWbsElement
   */
  'getWbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWbsElement.Responses.$200>
  /**
   * moveWbsElement
   */
  'moveWbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.MoveWbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MoveWbsElement.Responses.$200>
  /**
   * updateWbsElement
   */
  'updateWbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateWbsElement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateWbsElement.Responses.$200>
  /**
   * deleteWbsElement
   */
  'deleteWbsElement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteWbsElement.Responses.$204>
  /**
   * listWorkPackages
   */
  'listWorkPackages'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListWorkPackages.Responses.$200>
  /**
   * addWorkPackage
   */
  'addWorkPackage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddWorkPackage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddWorkPackage.Responses.$200>
  /**
   * getWorkPackage
   */
  'getWorkPackage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWorkPackage.Responses.$200>
  /**
   * updateWorkPackage
   */
  'updateWorkPackage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateWorkPackage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateWorkPackage.Responses.$200>
  /**
   * deleteWorkPackage
   */
  'deleteWorkPackage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * addInvitation
   */
  'addInvitation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddInvitation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddInvitation.Responses.$201>
  /**
   * acceptInvitation
   */
  'acceptInvitation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AcceptInvitation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AcceptInvitation.Responses.$200>
  /**
   * rejectInvitation
   */
  'rejectInvitation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RejectInvitation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RejectInvitation.Responses.$200>
  /**
   * getMyDashboard
   */
  'getMyDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMyDashboard.Responses.$200>
  /**
   * listMyProjects
   */
  'listMyProjects'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListMyProjects.Responses.$200>
  /**
   * listMyOrganisations
   */
  'listMyOrganisations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListMyOrganisations.Responses.$200>
  /**
   * listMyMemberships
   */
  'listMyMemberships'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListMyMemberships.Responses.$200>
}

export interface PathsDictionary {
  ['/organisations/{organisation_id}/projects/{project_id}/assumptions']: {
    /**
     * listProjectAssumptions
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectAssumptions.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/assumptions/dashboard']: {
    /**
     * getProjectAssumptionDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectAssumptionDashboard.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/assumptions/add']: {
    /**
     * addAssumption
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddAssumption.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddAssumption.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/assumptions/{assumption_id}']: {
    /**
     * getAssumption
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAssumption.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/assumptions/{assumption_id}/update']: {
    /**
     * updateAssumption
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateAssumption.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateAssumption.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/dependencies']: {
    /**
     * listProjectDependencies
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectDependencies.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/dependencies/dashboard']: {
    /**
     * getProjectDependencyDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectDependencyDashboard.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/dependencies/add']: {
    /**
     * addDependency
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddDependency.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddDependency.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/dependencies/{dependency_id}']: {
    /**
     * getDependency
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDependency.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/dependencies/{dependency_id}/update']: {
    /**
     * updateDependency
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateDependency.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateDependency.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/issues']: {
    /**
     * listProjectIssues
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectIssues.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/issues/dashboard']: {
    /**
     * getProjectIssuesDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectIssuesDashboard.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/issues/add']: {
    /**
     * addIssue
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddIssue.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddIssue.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/issue/{issue_id}']: {
    /**
     * getIssue
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetIssue.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/issues/{issue_id}/update']: {
    /**
     * updateIssue
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateIssue.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateIssue.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/obs']: {
    /**
     * getObs
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetObs.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/obs/add']: {
    /**
     * addObs
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddObs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddObs.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/obs/elements/add']: {
    /**
     * addObsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddObsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddObsElement.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/obs/elements/{element_id}']: {
    /**
     * getObsElement
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetObsElement.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/obs/elements/{element_id}/move']: {
    /**
     * moveObsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.MoveObsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MoveObsElement.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/obs/elements/{element_id}/update']: {
    /**
     * updateObsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateObsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateObsElement.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/obs/elements/{element_id}/delete']: {
    /**
     * deleteObsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteObsElement.Responses.$200>
  }
  ['/organisations']: {
    /**
     * listOrganisations
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListOrganisations.Responses.$200>
  }
  ['/organisations/{organisation_id}']: {
    /**
     * getOrganisation
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrganisation.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects']: {
    /**
     * listOrganisationProjects
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListOrganisationProjects.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/add']: {
    /**
     * addProject
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddProject.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddProject.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}']: {
    /**
     * getProject
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProject.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/dashboard']: {
    /**
     * getProjectDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectDashboard.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/ram']: {
    /**
     * getRam
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRam.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/ram/add']: {
    /**
     * addRam
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddRam.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddRam.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/ram/assignments/add']: {
    /**
     * addRamAssignment
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddRamAssignment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddRamAssignment.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/ram/assignments/{assignment_id}/update']: {
    /**
     * updateRamAssignment
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateRamAssignment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateRamAssignment.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/ram/assignments/{assignment_ids}/delete']: {
    /**
     * deleteRamAssignments
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/rbs']: {
    /**
     * getRbs
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRbs.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/rbs/add']: {
    /**
     * addRbs
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddRbs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddRbs.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/rbs/elements/add']: {
    /**
     * addRbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddRbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddRbsElement.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/rbs/elements/{element_id}']: {
    /**
     * getRbsElement
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRbsElement.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/rbs/elements/{element_id}/move']: {
    /**
     * moveElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.MoveElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MoveElement.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/rbs/elements/{element_id}/update']: {
    /**
     * updateRbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateRbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateRbsElement.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/rbs/elements/{element_id}/delete']: {
    /**
     * deleteRbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteRbsElement.Responses.$200>
  }
  ['/organisations/{organisation_id}/risks']: {
    /**
     * listOrganisationRisks
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListOrganisationRisks.Responses.$200>
  }
  ['/organisations/{organisation_id}/risks/dashboard']: {
    /**
     * getOrganisationRiskDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrganisationRiskDashboard.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/risks']: {
    /**
     * listProjectRisks
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectRisks.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/risks/dashboard']: {
    /**
     * getProjectRiskDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectRiskDashboard.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/risks/add']: {
    /**
     * addRisk
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddRisk.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddRisk.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/risks/{risk_id}']: {
    /**
     * getRisk
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRisk.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/risks/{risk_id}/update']: {
    /**
     * updateRisk
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateRisk.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateRisk.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/wbs']: {
    /**
     * getWbs
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWbs.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/wbs/add']: {
    /**
     * addWbs
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddWbs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddWbs.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/wbs/elements/add']: {
    /**
     * addWbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddWbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddWbsElement.Responses.$201>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/wbs/elements/{element_id}']: {
    /**
     * getWbsElement
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWbsElement.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/wbs/elements/{element_id}/move']: {
    /**
     * moveWbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.MoveWbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MoveWbsElement.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/wbs/elements/{element_id}/update']: {
    /**
     * updateWbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateWbsElement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateWbsElement.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/wbs/elements/{element_id}/delete']: {
    /**
     * deleteWbsElement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteWbsElement.Responses.$204>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/work-packages']: {
    /**
     * listWorkPackages
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListWorkPackages.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/work-packages/add']: {
    /**
     * addWorkPackage
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddWorkPackage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddWorkPackage.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/work-packages/{workpackage_id}']: {
    /**
     * getWorkPackage
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWorkPackage.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/work-packages/{workpackage_id}/update']: {
    /**
     * updateWorkPackage
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateWorkPackage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateWorkPackage.Responses.$200>
  }
  ['/organisations/{organisation_id}/projects/{project_id}/work-packages/{workpackage_id}/delete']: {
    /**
     * deleteWorkPackage
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/organisations/{organisation_id}/invitations/add']: {
    /**
     * addInvitation
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddInvitation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddInvitation.Responses.$201>
  }
  ['/invitations/{invitation_id}/accept']: {
    /**
     * acceptInvitation
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AcceptInvitation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AcceptInvitation.Responses.$200>
  }
  ['/invitations/{invitation_id}/reject']: {
    /**
     * rejectInvitation
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RejectInvitation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RejectInvitation.Responses.$200>
  }
  ['/me/dashboard']: {
    /**
     * getMyDashboard
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMyDashboard.Responses.$200>
  }
  ['/me/projects']: {
    /**
     * listMyProjects
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListMyProjects.Responses.$200>
  }
  ['/me/organisations']: {
    /**
     * listMyOrganisations
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListMyOrganisations.Responses.$200>
  }
  ['/me/memberships']: {
    /**
     * listMyMemberships
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListMyMemberships.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
