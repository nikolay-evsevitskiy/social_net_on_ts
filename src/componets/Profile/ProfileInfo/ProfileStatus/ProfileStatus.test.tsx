import React from "react";
import {create} from "react-test-renderer"
import ProfileStatus from "./ProfileStatus";

describe("Button component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus updateStatus={() => {
        }} status="TEST!!!"/>);
        const instance = component.getInstance();
        // @ts-ignore
        expect(instance.state.status).toBe("TEST!!!");
    });
    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus updateStatus={() => {
        }} status="TEST!!!"/>);
        const root = component.root;
        const span = root.findByType("span")
        expect(span).not.toBeNull();
    });
    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus updateStatus={() => {
        }} status="TEST!!!"/>);
        const root = component.root;
        expect(() => {
            root.findByType("input")
        }).toThrow();
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus updateStatus={() => {
        }} status="TEST!!!"/>);
        const root = component.root;
        const span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input")
        expect(input.props.value).toBe("TEST!!!");
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus updateStatus={mockCallback} status="TEST!!!"/>);
        const instance = component.getInstance();
        // @ts-ignore
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});