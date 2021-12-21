import profileReducer, {
    deletePost,
    postAdd,
    PostsType,
    ProfileStateType,
    setStatus,
    setUserProfile
} from "./profile-reducer";

const startState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likes: 3},
        {id: 2, message: 'It\'s my first post', likes: 6},
        {id: 3, message: 'I like JS!!!', likes: 75},
        {id: 4, message: 'Just, do it!!!', likes: 10}
    ] as PostsType[],
    profile: {} as ProfileStateType,
    status: ''
}

test('this test should be add new post in the initial state', () => {

    const action = postAdd('Hello World!')
    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(5)
    expect(endState.posts[4].message).toBe('Hello World!')
})

test('this test for checks set user profile', () => {
    const contacts = {
        facebook: null,
        website: null,
        vk: null,
        twitter: null,
        instagram: null,
        youtube: 'test',
        github: null,
        mainLink: null
    }
    const profileState: ProfileStateType = {
        aboutMe: 'Alex',
        contacts,
        lookingForAJob: true,
        lookingForAJobDescription: 'I looking for a good jod!!',
        fullName: 'Thomson',
        userId: 1234321,
        photos: {
            small: 'big',
            large: 'small'
        }
    }

    const action = setUserProfile(profileState)
    const endState = profileReducer(startState, action)

    expect(endState.profile.fullName).toBe('Thomson')
    expect(endState.profile.userId).toBe(1234321)
    expect(endState.profile.contacts.youtube).toBe('test')
})

test('this test should be for add new status in the initial state', () => {

    const action = setStatus('Hello World!')
    const endState = profileReducer(startState, action)

    expect(endState.status).toBe('Hello World!')
})

test('this test should be for delete post into the initial state', () => {

    const action = deletePost(1)
    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(3)
    expect(endState.posts[0].id).toBe(2)
})