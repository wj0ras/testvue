const { data, error } = await supabase.auth.signInWithPassword({
  email: 'teste@email.com',
  password: '123456'
})

console.log('data', data)
console.log('error', error)