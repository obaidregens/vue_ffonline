<template>
    <div>
        <h1>Events Listing</h1>
        <EventCard/>
    </div>
</template>

<script>
    import EventCard from "@/components/EventCard";
    export default {
        name: "EventList",
        components:{
            EventCard
        }
    }
</script>

<style scoped>

</style>