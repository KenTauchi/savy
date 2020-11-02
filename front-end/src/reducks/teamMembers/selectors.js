import { createSelector } from "reselect";

const teamMemberSelector = (state) => state.team;
export const getTeamMembers = createSelector(
  [teamMemberSelector],
  (state) => state
);
