export const state = () => ({
    success: '',
    showSuccess: false,
    error: '',
    showError: false
})
export const mutations = {
    showSuccess (state, payload) {
        state.success = payload.text
        state.showSuccess = true
    },
    initSuccess(state) {
        state.showSuccess = false
    },

    showError (state, payload) {
        state.error = payload.text
        state.showError = true
    },
    initError(state) {
        state.showError = false
    }
}
export const actions = {
    success ({ commit }, payload) {
        commit('showSuccess', payload)
        setTimeout(() => {
            commit('initSuccess')
        }, 3000)
    },

    error ({ commit }, payload) {
        commit('showError', payload)
        setTimeout(() => {
            commit('initError')
        }, 3000)
    }
}
export const getters = {
    getSuccessState (state) {
        return state.showSuccess
    },
    getSuccessText (state) {
        return state.success
    },
    getErrorState (state) {
        return state.getErrorState
    },
    getErrorText(state) {
        return state.error
    },
}
