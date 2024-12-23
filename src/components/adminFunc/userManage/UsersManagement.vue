<template>
  <div class="users-page">
    <h1>Список пользователей</h1>

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Логин</th>
        <th>Роль</th>
        <th>Статус</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ user.login }}</td>
        <td>{{ user.userRole === 'USER' ? 'Пользователь' : 'Администратор' }}</td>
        <td>{{ user.isBlocked === 'USER_CLOSED' ? 'Заблокирован' : 'Активен' }}</td>
        <td>
          <button @click="toggleBlockUser(user)">
            {{ user.isBlocked === 'USER_CLOSED' ? 'Разблокировать' : 'Заблокировать' }}
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'

const users = ref([])
const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('jwt')
  const authority = localStorage.getItem('authority')
  if (!token || authority !== 'ADMIN') {
    router.push(`/api/v1/bookstore`)
  } else {
    getAllUsers(token)
  }
})

const getAllUsers = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/userManagement/getAllUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })


    if (response.data && response.data.responseEntity) {
      console.log(response)
      users.value = response.data.responseEntity.listUsersDto.map(userDto => ({
        login: userDto.login,
        userRole: userDto.userRole,
        isBlocked: userDto.userStatus, // Проверка блокировки
      }))
    } else {
      console.error("Пользователи не найдены.")
    }
  } catch
      (error) {
    if (error.response && error.response.status === 400) {
      console.error("Ошибка на сервере.")
    } else {
      console.error("Ошибка в процессе загрузки пользователей:", error.message)
    }
  }
}

const toggleBlockUser = async (user) => {
  const token = localStorage.getItem('jwt')
  try {
    const newStatus = user.isBlocked === 'USER_ACTUAL' ? 3 : 1
    const response = await axios.post(
        "http://localhost:8080/api/v1/userManagement/updateUserStatus",
        {
          login: user.login,
          userStatusId: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    )
    if (response.data.message === "Self harassment") {
      alert("Вы пытаетесь заблокировать себя!")
    } else {
      location.reload()
      user.isBlocked = !user.isBlocked
    }


  } catch (error) {
    console.error("Ошибка изменения статуса пользователя:", error.message)
  }
}
</script>

<style scoped>
.users-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  padding-top: 95px;
  color: #ffffff;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;
}

table th,
table td {
  border: 1px solid #4c4848;
  padding: 10px;
  text-align: left;
}

table th {
  background-color: #88620f;
}

button {
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background-color: #0056b3;
}

/* Адаптивность */
@media (max-width: 768px) {
  table {
    font-size: 14px;
  }

  table th,
  table td {
    padding: 8px;
  }

  h1 {
    font-size: 20px;
  }

  button {
    font-size: 14px;
    padding: 5px 8px;
  }
}

@media (max-width: 480px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  table th,
  table td {
    font-size: 12px;
    padding: 5px;
  }

  h1 {
    font-size: 18px;
  }

  button {
    font-size: 12px;
    padding: 4px 6px;
  }
}
</style>

