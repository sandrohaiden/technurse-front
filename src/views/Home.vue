<template >
    <div>
        <p class="text-center display-1">Congratulations!</p>
        {{email}}
        
        <v-btn color="orange" @click="logout">
            Logout
        </v-btn>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import { url } from '../config';
export default {
    data(){
        return{
            email: '',
        }
    },
    methods: {
        ...mapActions([
        'logout',
        ]),
    },
    created(){
        axios.get(`${url}/user`, {
          headers: {
            Authorization: `bearer ${this.$store.state.accessToken}`,
          }
        }).then((result) => {
            this.email = result.data.email;
        })
    }
}
</script>