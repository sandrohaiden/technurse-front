<template>
  <v-layout row justify-center align-center>
        <v-form ref="form" lazy-validation>
            <v-flex justify="center">

                <p class="text-center display-1">Efetuar Login</p>

                <v-flex xs12>
                    <v-text-field
                    label="E-mail"
                    placeholder=" "
                    outlined
                    :rules="emailRules"
                    required
                    v-model="send.email"
                    color="#12D699"
                    >
                    </v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                    label="Senha"
                    v-model="send.password"
                    placeholder=" "
                    :type="show ? 'text' : 'password'"
                    outlined
                    :append-icon="show ? 'visibility':'visibility_off'"
                    @click:append="show = !show"
                    color="#12D699"
                    >
                    </v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn large color="#00f07c" @click="validate" block class="white--text">Enviar</v-btn>
                </v-flex>
                <v-flex xs12 class="text-center">
                    <v-btn to="registrar" text small color="primary">Não tenho uma conta</v-btn>
                </v-flex>
            </v-flex>
        </v-form>
    </v-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            send: {
                email: '',
                password: '',
            },
            emailRules: [
                v => !!v || 'O E-mail é obrigatório',
                v => /.+@.+/.test(v) || 'E-mail precisa ter um formato válido',
            ],
            show: false,
        }
    },

    methods: {
        ...mapActions(['doLogin', 'fetchAccessToken']),

        validate() {
            if (this.$refs.form.validate()) {
                this.submit();
            }
        },

        async submit() {
            this.doLogin(this.send);
            setTimeout(() => {
                console.log(this.$store.state.accessToken);
            }, 1000);
        },
    }
};
</script>
