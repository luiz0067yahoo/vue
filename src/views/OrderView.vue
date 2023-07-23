<script setup lang="ts">
    import { mergeProps, onMounted, render } from 'vue'
    import logo from '../assets/images/logo.svg';
    import shoppingCart from '../assets/icons/shopping-cart-solid.vue';
    import trash from '../assets/icons/trash-solid.vue';
    import {Product} from '../core/model/product';
    let props=defineProps<{
    }>()
    let itensCount=0;
    let products:Product[]=[
        {id:'1',name:'Produto 1'},
        {id:'2',name:'Produto 2'},
    ];
   
    onMounted(() => {
        products=[
            {id:'1',name:'Produto 1'},
            {id:'2',name:'Produto 2'},
        ];
    });
     //render
    //created() 
    //emit
    //watch: 
</script>

<template>
    <img :src="logo" class="w-48 mx-auto mt-16">
    <div class="w-96 h-auto mx-auto p-6 mt-4 flex flex-wrap justify-center items-start rounded-lg bg-white text-neutral-900 font-roboto">
        <div class="w-full">
            <h1 class="w-full mt-2 flex justify-center  text-2xl  ">Lista de Produtos</h1>
            <label class="w-full mt-2 flex justify-center text-sm ">Escolha uma das opções abaixo:</label>
            <div class="w-full mt-2 flex justify-center text-sm " v-for="product in products">
                <label class="text-sm">
                    <button class="w-5 h-5 mr-1 rounded-md bg-purple-500 text-white">+</button>
                    {{product?.name||'---'}}
                </label>
            </div>
            <h1 class="w-full mt-4 flex justify-center text-2xl  ">Checkout</h1>
            <label class="w-full mt-4 flex justify-center text-sm ">Resumo de compra:</label>
            <label v-if="itensCount==0" class="w-full mt-4 flex justify-center text-sm ">Nenhum produto no carrinho.</label>
            <label v-else class="w-full mt-4 flex justify-center text-sm ">
                {{ 3 }}x
                {{ 'Produto 1' }}
                <button class="w-5 h-5 ml-2 rounded-md bg-red-500 text-white"><trash class="h-3 mx-auto"/></button>
            </label>

            <button :class="{ 'bg-purple-700': itensCount>0 }" class="w-full h-10 mt-4 mr-1 p-2 flex justify-center rounded-md text-sm border border-neutral-900">
                <shoppingCart class="h-5"/>
                <img class="h5 w-5 fill-orange-400" />
                <label class="mx-2">FECHAR PEDIDO</label>
            </button>
        </div>
    </div>
    <label class="w-full mt-4 flex justify-center text-sm text-white">Copyright 2023 - Master da Web.</label>
</template>

<style scoped>
</style>
