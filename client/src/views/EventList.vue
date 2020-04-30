<template>
    <div>
        <h1>Events Listing</h1>
        <EventCard v-for="event in events" :key="event.id" :event="event"/>
    </div>
</template>

<script>
    import EventCard from "@/components/EventCard";
    import EventService from "@/services/EventService";
    export default {
        name: "EventList",
        components:{
            EventCard
        },
        data () {
            return {
                events: []
            }
        },
        created (){
            EventService.getEvents()
                .then(response_txt => {
                    this.events = JSON.parse(response_txt).events;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
</script>

<style scoped>

</style>