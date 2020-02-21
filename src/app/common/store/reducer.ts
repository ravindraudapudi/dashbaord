import { Action } from '@ngrx/store';

export const SET_FISCAL_REPORT = 'SET_FISCAL_REPORT';

const initialSate = {
    fiscalYear: 2018,
    reportingDate: '2018-09-30'
};

export function setRDateDetails(state = initialSate, action) {
    switch (action.type) {
        case SET_FISCAL_REPORT:
            return {
                ...state, reportingDate: action.payload.reportingDate,
                fiscalYear: action.payload.fiscalYear
            };
        default:
            return state;
    }
};



