import { Domain } from "../../../common/enum/domain.enum";
import { build as buildJobTags } from "./dsep-job/response.tag.mapping";
import { build as buildCourseTags } from "./dsep-courses/response.tag.mapping";
import { build as buildMentoringTags } from "./dsep-mentoring/response.tag.mapping";
import { build as buildScholarshipTags } from "./dsep-scholarships/response.tag.mapping";

import { build as buildPharmacyTags } from "./dhp-pharmacy/response.tag.mapping";
import { build as buildConsultationTags } from "./dhp-consultation/response.tag.mapping";
import { build as buildPDiagnosticTags } from "./dhp-diagnostic/response.tag.mapping";

export const buildTags = (tags: any[], domain: string): any => {
    switch (domain) {
        case Domain.DSEP_JOB: {
            return buildJobTags(tags);
        }
        case Domain.DSEP_SCHOLARSHIP: {
            return buildScholarshipTags(tags);
        }
        case Domain.DSEP_MENTORING: {
            return buildMentoringTags(tags);
        }
        case Domain.DSEP_COURSE: {
            return buildCourseTags(tags);
        }
        case Domain.DHP_PHARMACY: {
            return buildPharmacyTags(tags);
        }
        case Domain.DHP_CONSULTATION: {
            return buildConsultationTags(tags);
        }
        case Domain.DHP_DIAGNOSTIC: {
            return buildPDiagnosticTags(tags);
        }
        default:
            return { tags };
    }
}
