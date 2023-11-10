import { buildRequestContextVer1_1_0 } from "../../common";
import { buildOnSearchResponse } from "./response.schema.helper";
import jobResponse from './mock/response.job.json';
import coursesResponse from "./mock/response.course.json";
import scholarshipResponse from "./mock/response.scholarship.json";
import mentoringResponse from "./mock/response.mentoring.json";

import pharmacyResponse from './mock/response.pharmacy.json';
import diagnosticResponse from './mock/response.diagnostic.json';
import consultationResponse from './mock/response.consultation.json';

export const searchService = (body: any) => {
  // const context = buildRequestContextVer1_1_0(body?.context, "search");
  // return { context };

  // return buildOnSearchResponse(jobResponse);
  // return buildOnSearchResponse(coursesResponse);
  // return buildOnSearchResponse(scholarshipResponse);
  // return buildOnSearchResponse(mentoringResponse);
  // return buildOnSearchResponse(pharmacyResponse);
  // return buildOnSearchResponse(diagnosticResponse);
  return buildOnSearchResponse(consultationResponse);
};
