<template>
    <nav>
        <v-toolbar flat class="text-xs-center">
            <v-row class="justify-center">
                <v-img :src="require('../assets/tech.png')" contain height="50" max-width="90"></v-img>
                <v-img :src="require('../assets/nurse.png')" cover height="50" max-width="80"></v-img>
            </v-row>
        </v-toolbar>
    </nav>
</template>

<script>
export default {
    name: 'tech-header',
}
</script>