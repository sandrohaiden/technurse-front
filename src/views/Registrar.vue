<template>
    <v-container fill-height>
        <v-layout row justify-center align-center v-if="!registrado">
          <v-flex xs10 sm6 md4 lg4 justify="center">
              <div class="text-center">Crie sua conta</div>
               <v-form ref="form" v-model="valid" lazy-validation>
                <v-flex mt-4 xs12>
                    <v-text-field
                    label="Nome Completo"
                    placeholder=" "
                    outlined
                    color="#12D699"
                    validate-on-blur
                    v-model="send.nome"
                    background-color="#12D699"
                    >
                    </v-text-field>
                </v-flex>

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
                    @input="senhaInput"
                    :append-icon="show ? 'visibility':'visibility_off'"
                    @click:append="show = !show"
                    color="#12D699"
                    >
                    </v-text-field>
                </v-flex>

                <v-row>
                    <v-flex xs4 px-2><v-progress-linear color="#12D699" :value="progress1"></v-progress-linear></v-flex>
                    <v-flex xs4 px-2><v-progress-linear color="#12D699" :value="progress2"></v-progress-linear></v-flex>
                    <v-flex xs4 px-2><v-progress-linear color="#12D699" :value="progress3"></v-progress-linear></v-flex>
                </v-row>
                
                <v-flex mt-2>
                    <v-icon small left :color="(length)?'#12D699': 'orange'">lens</v-icon> Pelo menos 6 caracteres
                </v-flex>
                <v-flex>
                    <v-icon small left :color="(upper)?'#12D699': 'orange'">lens</v-icon> Pelo Menos 1 letra maiúscula
                </v-flex>
                <v-flex>
                    <v-icon small left :color="(number)?'#12D699': 'orange'">lens</v-icon> Pelo menos 1 número
                </v-flex>

                <v-flex mt-4 xs12>
                    <v-text-field
                    label="Confirme sua senha"
                    v-model="send.password_confirmation"
                    placeholder=" "
                    type="password"
                    outlined
                    :rules="confirmationRules"
                    @click:append="show = !show"
                    color="#12D699"
                    >
                    </v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-btn large color="#00f07c" @click="validate" block class="white--text">Criar Conta</v-btn>
                </v-flex>
                <v-flex xs12 class="text-center">
                    <v-btn to="login" text small color="primary">Já tenho uma conta</v-btn>
                </v-flex>
            </v-form>
          </v-flex>
        </v-layout>
        <v-layout row justify-center align-center v-if="registrado">
            <v-flex justify="center">
                <p class="text-center">
                    <v-icon x-large color="#00f07c" style="font-size: 800%">
                        check_circle_outline
                    </v-icon>
                </p>
                <br>
                <br>
                <p class="text-center display-1">Tudo Certo</p>
                <p class="text-center">Verifique sua caixa de entrada <br> para confirmar seu email</p>
            </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import axios from 'axios';
import { url } from '../config';

export default {
    data(){
        return {
            send: {
                email: '',
                nome: '',
                password: '',
                password_confirmation: '',
            },
            upper: 0,
            length: 0,
            number: 0,
            valid: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            confirmationRules: [
                v => !!v || 'A confirmação da senha é necessária',
                v => v===this.send.password || 'Senha diferente da digitada anteriormente',
            ],
            show: false,
            progress1: 0,
            progress2: 0,
            progress3: 0,
            registrado: false,
        }
    },
    methods: {
        senhaInput(){
            this.length = (this.send.password.length >= 6)? true : false;
            this.upper = (/[A-Z]/.test(this.send.password))? true : false;
            this.number = (/[0-9]/.test(this.send.password))? true : false;
            this.progress1 = (this.length || this.upper || this.number)? 100:0;
            this.progress2 = ((this.length && this.upper)
                                || (this.upper && this.number)
                                || (this.length && this.number))? 100:0;
            this.progress3 = (this.length && this.upper && this.number)? 100:0;
        },

        validate() {
            if (this.$refs.form.validate()) {
                this.submit();
            }
        },

        submit() {
            axios.post(`${url}/auth/register`, this.send).then((result) => {
                console.log(result);
                this.registrado = true;
            }).catch((e) => {
                console.log(e);
            })
        }
    },
}
</script>