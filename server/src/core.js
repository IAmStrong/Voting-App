import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries (state, entries) {
    return state.set('entries', List(entries));
}

export function next (state) {
    const winners = getWinners(state.get('vote'));
    const entries = state.get('entries').concat(winners);
    let nextState = state.merge({
        vote: Map({
            pair: entries.take(2)
        }),
        entries: entries.skip(2)
    });

    if (entries.size === 1) {
        nextState = state.remove('vote')
                         .remove('entries')
                         .set('winner', entries.first());
    }

    return nextState;
}

export function vote (voteState, entry) {
    return voteState.updateIn(
        ['tally', entry],
        0,
        tally => tally + 1 // !!!!!!!!!
    );
}

function getWinners (vote) {
    let result = [];

    if (vote) {
        const [a, b] = vote.get('pair');
        const aVotes = vote.getIn(['tally', a], 0);
        const bVotes = vote.getIn(['tally', b], 0);

        if (aVotes > bVotes) result = [a];
        else if (aVotes < bVotes) result = [b];
        else result = [a, b];
    }

    return result;
}