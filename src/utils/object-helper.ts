import {UserType} from "../Redux/users-reducer";

export const UpdateObjectInArray = (items: Array<UserType>, itemId: number, newObjectProps: {}) => {
    return items.map(t => {
        if (t.id === itemId) {
            return {...t, ...newObjectProps}
        }
        return t;
    })

}