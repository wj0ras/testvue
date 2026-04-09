<template>
    <div class="text-white">
        <ul v-if="expenses.length">
            <li v-for="expense in expenses" :key="expense.id">
                {{ expense.name }}: {{ expense.amount }}
            </li>
        </ul>
        <p v-else >dsad</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabase.js';

const expenses = ref([]);

const fetchExpenses = async () => {
    const { data, error } = await supabase
        .from('expenses')
        .select('*');

    if (error) {
        console.error('Error fetching expenses:', error);
    } else {
        expenses.value = data;
    }
};

onMounted(() => {
    fetchExpenses();
});
</script>

<style scoped>
</style>
