<template>
    <div class="text-white bg-gray-600 p-2 rounded">
        <ul v-if="expenses.length">
            <li v-for="expense in expenses" :key="expense.id">
                {{ expense.description }}: {{ expense.amount }} BRL
            </li>
        </ul>
        <p v-else>Nenhum gasto hoje.</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useExpenses } from '../composables/useExpenses';

const { expenses, fetchExpenses } = useExpenses();

onMounted(fetchExpenses);
</script>

<style scoped>
</style>
