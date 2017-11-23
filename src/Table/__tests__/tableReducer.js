import {getStateSetter, mockGroupsRequest} from '../../../test/testUtils';
import tableData from '../../../_mock/table/data.json';
import tableReducer from '../tableReducer';
import * as tableActions from '../actions';

describe('tableReducer', () => {
  const initialState = {
    columns: [],
    checked: [],
    isLoaded: false,
    history: {
      prev: [],
      next: [],
      current: []
    }
  };
  const setState = getStateSetter(initialState);
  const freezedInitialState = setState();

  describe('TABLE_EDITOR_ROW_COPY_SUCCESS', () => {
    const copyRowId = 45496;
    const copyRowsRequestPayload = {rows: [{id: copyRowId, copy: true}]};
    const copiedRows = mockGroupsRequest(copyRowsRequestPayload);

    it('should not add a group if there is no group from which it was copied', () => {
      expect(tableReducer(
        freezedInitialState,
        tableActions.copyRowSuccess({rows: copiedRows.payload, new_row: tableData.new_row})
      )).toEqual(initialState);
    });

    it('should add copied groups', () => {
      const expectedCurrent = [...tableData.rows];
      const copyRowIndex = tableData.rows.findIndex(row => row.check.common.id === copyRowId);

      expectedCurrent.splice(copyRowIndex + 1, 0, tableData.rows[copyRowIndex]);
      expect(tableReducer(
        setState({
          history: {
            ...initialState.history,
            current: tableData.rows
          }
        }),
        tableActions.copyRowSuccess({rows: copiedRows.payload, new_row: tableData.new_row})
      )).toEqual({
        ...initialState,
        history: {
          ...initialState.history,
          current: expectedCurrent
        }
      });
    });

    it('should delete the users activity history', () => {
      const history = [[], [], []];

      expect(tableReducer(
        setState({
          history: {
            ...initialState.history,
            prev: history,
            next: history
          }
        }),
        tableActions.copyRowSuccess({rows: copiedRows.payload, new_row: tableData.new_row})
      )).toEqual(initialState);
    });
  });
});