const actions = {
    connect: 'CONNECT',
};

const initialState: State = {
    provider: null,
    wsProvider: null,
    signer: null,
    account: null,
    networkID: null,
    eventContract: null,
    eventWsContract: null
};

const reducer = (state: State, action: Action): State => {
    const { type, payload } = action;

    switch (type) {
        case actions.connect:
            return { ...initialState, ...payload};
        default:
            throw new Error('Undefined reducer action type');
    }
};

export { actions, initialState, reducer };
