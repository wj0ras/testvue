<template>
    <div class="w-full flex flex-col justify-center items-center p-4">
        <header class="flex justify-between items-center mb-4">
            <button @click="$refs.expenseModal.openModal()" class="bg-gray-500 hover:bg-grayn-600 text-white py-2 px-4 rounded">+ Adicionar Despesa</button>
        </header>

        <main class="bg-gray-800 rounded-lg p-4 w-full max-w-2xl">
            <Expenses />
        </main>
        
        
        
        <AddExpenseModal ref="expenseModal" @expenseAdded="fetchExpenses"/>
    </div>
</template>

<script setup>
import Expenses from './Expenses.vue';
import AddExpenseModal from './AddExpenseModal.vue';
</script>

<style scoped>

.btn-add {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.btn-add:hover {
    background-color: #45a049;
}
</style>
