export default {
    getEvents() {
        return fetch('http://localhost:8081/getEvents')
            .then(response => {
                return response.text();
            })
    },
    getEvent(id) {
        return fetch ('http://localhost:8081/getEvent/' + id)
            .then(response => {
                return response.text();
            })
    }
}