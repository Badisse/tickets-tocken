const actions = {
    connect: 'CONNECT',
};

const initialState: State = {
    provider: null,
    wsProvider: null,
    signer: null,
    account: null,
    networkID: null,
    loading: false
};

const reducer = (state: State, action: Action): State => {
    const { type, payload } = action;

    switch (type) {
        case actions.connect:
            return { ...initialState, ...payload, loading: false };
        default:
            throw new Error('Undefined reducer action type');
    }
};

export { actions, initialState, reducer };
