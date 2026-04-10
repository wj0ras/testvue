<template>
    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Nova Despesa</h3>
                <button @click="closeModal" class="btn-close">✕</button>
            </div>
            
            <form @submit.prevent="submitExpense" class="form">
                <div class="form-group">
                    <label for="description">Descrição:</label>
                    <input 
                        v-model="formData.description" 
                        type="text" 
                        id="description"
                        placeholder="Digite a descrição"
                        required
                    />
                </div>
                
                <div class="form-group">
                    <label for="amount">Valor:</label>
                    <input 
                        v-model.number="formData.amount" 
                        type="number" 
                        id="amount"
                        placeholder="0.00"
                        step="0.01"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="category">Categoria:</label>
                    <select v-model="formData.category" id="category" required>
                        <option value="Alimentação">Alimentação</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Moradia">Moradia</option>
                        <option value="Lazer">Lazer</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button type="button" @click="closeModal" class="btn-cancel">Cancelar</button>
                    <button type="submit" class="btn-submit">Enviar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../lib/supabase.js';
import { showToast } from '../store/toast.js';
import { useExpenses } from '../composables/useExpenses';
const showModal = ref(false);
const formData = ref({ description: '', amount: '' });

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    formData.value = { description: '', amount: '' };
};
const { fetchExpenses } = useExpenses();

const submitExpense = async () => {
    if (!formData.value.description || !formData.value.amount) {
        showToast("Por favor, preencha todos os campos.", "error");
        return;
    }

const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // 1. Tentar buscar o dia de hoje para este usuário
  let { data: dayRecord, error: dayError } = await supabase
    .from('expense_days')
    .select('id')
    .eq('date', today)
    .single();

  let targetDayId;

  // 2. Se o dia não existir, vamos criá-lo
  if (!dayRecord) {
    const { data: newDay, error: createDayError } = await supabase
      .from('expense_days')
      .insert([{  date: today }])
      .select()
      .single();
    
    if (createDayError) throw createDayError;
    targetDayId = newDay.id;
  } else {
    targetDayId = dayRecord.id;
  }

  // 3. Agora inserimos a despesa vinculada ao ID do dia
  const { error: expenseError } = await supabase
    .from('expenses')
    .insert([{
      description: formData.value.description,
      amount: formData.value.amount,
      category: formData.value.category,
      day_id: targetDayId 
    }]);

  if (!expenseError) {
        showToast("Sucesso!", "success");
        await fetchExpenses(); // Atualiza o estado global!
        closeModal();
    }
};

defineExpose({
    openModal
});
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 90%;
    overflow: hidden;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
}

.modal-header h3 {
    margin: 0;
    color: #333;
}

.btn-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    transition: color 0.3s;
}

.btn-close:hover {
    color: #000;
}

.form {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
}

.btn-cancel,
.btn-submit {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.btn-cancel {
    background-color: #f0f0f0;
    color: #333;
}

.btn-cancel:hover {
    background-color: #e0e0e0;
}

.btn-submit {
    background-color: #4caf50;
    color: white;
}

.btn-submit:hover {
    background-color: #45a049;
}
</style>
