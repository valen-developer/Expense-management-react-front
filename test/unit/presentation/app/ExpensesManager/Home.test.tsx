import "@testing-library/jest-dom";
import "reflect-metadata";

import { fireEvent, screen } from "@testing-library/react";

import { It, Mock } from "moq.ts";
import { act } from "react-dom/test-utils";
import { container } from "tsyringe";
import { GroupQuery } from "../../../../../src/domain/Group/dtos/GroupQuery.dto";
import { Group } from "../../../../../src/domain/Group/Group.model";
import { GroupRepository } from "../../../../../src/domain/Group/interfaces/GroupRepository.interface";
import { Home } from "../../../../../src/presentation/app/ExpensesManager/Home/Home";
import { GroupMother } from "../../../../helpers/Group/GroupMother";
import { RendererHelper } from "../../../../helpers/presentation/RendererHelper";
import { UserMother } from "../../../../helpers/User/UserMother";
import { unitDepsRegister } from "../../../helpers/unitDepsRegister";

const user = UserMother.random();
const mockedInitialGroups = GroupMother.array(3, { user: user.uuid.value });

describe("Home", () => {
  let initialGroups: Group[] = mockedInitialGroups;

  beforeAll(() => {
    depsRegister();
  });

  beforeEach(() => {
    initialGroups = mockedInitialGroups;
  });

  it("should can create a new group", async () => {
    await act(async () => {
      RendererHelper.Wrapper(Home, {
        auth: {
          user: user,
          isAuthenticated: true,
        },
        group: {
          groups: [...initialGroups],
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const createGroupButton = screen.getByRole("button", {
      name: /create group/i,
    });

    fireEvent.click(createGroupButton);

    const groupNameInput = screen.getByTestId("group-name-input");

    fireEvent.change(groupNameInput, {
      target: { value: "My new group" },
    });

    const createButton = screen.getByTestId("submit-create-group");

    await act(async () => {
      fireEvent.click(createButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const succeessMessage = screen.getByText(/group created/i);
    expect(succeessMessage).toBeInTheDocument();

    const groupCard = screen.getByText(/my new group/i);
    expect(groupCard).toBeInTheDocument();
  });

  it("should see the name of groups", async () => {
    await act(async () => {
      RendererHelper.Wrapper(Home, {
        auth: {
          user: user,
          isAuthenticated: true,
        },
        group: {
          groups: [...initialGroups],
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    initialGroups.forEach((group) => {
      const groupCard = screen.getByText(group.name.value);
      expect(groupCard).toBeInTheDocument();
    });
  });
});

const depsRegister = () => {
  const mockedGroupRepository = new Mock<GroupRepository>()
    .setup((instance) => instance.filter(It.IsAny() as GroupQuery))
    .returns(Promise.resolve(mockedInitialGroups.map((g) => g.toDto())))
    .setup((instance) => instance.create(It.IsAny() as Group))
    .returns(Promise.resolve());

  container.register("GroupRepository", {
    useValue: mockedGroupRepository.object(),
  });

  unitDepsRegister();
};
