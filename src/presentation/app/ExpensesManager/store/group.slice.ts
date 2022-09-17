import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../../../../domain/Group/Group.model";

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups: (state, action: { payload: Group[] }) => {
      state.groups = action.payload;
    },
    addGroup: (state, action: { payload: Group }) => {
      state.groups = [action.payload, ...state.groups];
    },
  },
});

export const { setGroups, addGroup } = groupSlice.actions;
