// src/composables/useExpenses.js
import { ref } from 'vue';
import { supabase } from '../lib/supabase.js';

const expenses = ref([]); // Estado reativo compartilhado

export function useExpenses() {
    const fetchExpenses = async () => {
        const today = new Date().toLocaleDateString('en-CA');
        const { data, error } = await supabase
            .from('expense_days')
            .select('id, expenses (id, description, amount, category)')
            .eq('date', today);

        if (!error && data && data.length > 0) {
            expenses.value = data[0].expenses;
        } else {
            expenses.value = [];
        }
    };

    return {
        expenses,
        fetchExpenses
    };
}