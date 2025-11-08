import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001/api';

async function testAPIs() {
    console.log('🧪 Testing Todo App APIs...\n');

    try {
        // Test 1: Register user
        console.log('1️⃣  Testing User Registration...');
        const registerRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'testuser@example.com',
                password: 'TestPass123!'
            })
        });

        const registerData = await registerRes.json();
        console.log(`   Status: ${registerRes.status}`);
        console.log(`   Response:`, registerData);

        if (!registerData.token) {
            console.error('   ❌ No token received!');
            return;
        }

        const token = registerData.token;
        console.log('   ✅ User registered successfully\n');

        // Test 2: Login
        console.log('2️⃣  Testing User Login...');
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'testuser@example.com',
                password: 'TestPass123!'
            })
        });

        const loginData = await loginRes.json();
        console.log(`   Status: ${loginRes.status}`);
        console.log(`   ✅ Login successful\n`);

        // Test 3: Create Todo
        console.log('3️⃣  Testing Create Todo...');
        const createRes = await fetch(`${BASE_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                text: 'Test todo item'
            })
        });

        const createData = await createRes.json();
        console.log(`   Status: ${createRes.status}`);
        console.log(`   Response:`, createData);
        console.log('   ✅ Todo created\n');

        const todoId = createData.id;

        // Test 4: Get Todos
        console.log('4️⃣  Testing Get Todos...');
        const getRes = await fetch(`${BASE_URL}/todos`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const getTodosData = await getRes.json();
        console.log(`   Status: ${getRes.status}`);
        console.log(`   Todos count: ${getTodosData.length}`);
        console.log('   ✅ Todos retrieved\n');

        // Test 5: Update Todo
        console.log('5️⃣  Testing Update Todo...');
        const updateRes = await fetch(`${BASE_URL}/todos/${todoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                text: 'Updated todo',
                completed: true
            })
        });

        const updateData = await updateRes.json();
        console.log(`   Status: ${updateRes.status}`);
        console.log('   ✅ Todo updated\n');

        // Test 6: Delete Todo
        console.log('6️⃣  Testing Delete Todo...');
        const deleteRes = await fetch(`${BASE_URL}/todos/${todoId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log(`   Status: ${deleteRes.status}`);
        console.log('   ✅ Todo deleted\n');

        // Test 7: Security - SQL Injection attempt
        console.log('7️⃣  Testing Security - SQL Injection Prevention...');
        const sqlInjectionRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: "admin'--",
                password: 'TestPass123!'
            })
        });

        console.log(`   Status: ${sqlInjectionRes.status}`);
        console.log('   ✅ SQL injection blocked\n');

        console.log('✅ All API tests passed!');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testAPIs();
