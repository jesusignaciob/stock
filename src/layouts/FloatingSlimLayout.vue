<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Avatar from 'primevue/avatar';
import HomePage from '@/pages/HomePage.vue';

const sidebarVisible = ref(false);
const menuItems = ref([
    {
        label: 'Stocks',
        icon: 'pi pi-table',
        route: '/'
    },
    {
        label: 'About',
        icon: 'pi pi-info-circle',
        route: '/about'
    }
]);

const activeItem = ref(menuItems.value[0]);
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <!-- Floating Header -->
        <header class="sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur-sm border-b border-gray-100">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between h-16">
                    <!-- Left side - Menu button and logo -->
                    <div class="flex items-center space-x-3">
                        <Button icon="pi pi-bars" text rounded aria-label="Menu" @click="sidebarVisible = true"
                            class="hover:bg-gray-100" />
                        <span class="text-xl font-semibold text-gray-800">StockFlow</span>
                    </div>

                    <!-- Right side - User controls -->
                    <!-- <div class="flex items-center space-x-3">
                        <Button icon="pi pi-bell" text rounded severity="secondary" aria-label="Notifications"
                            class="hover:bg-gray-100" />
                        <Avatar icon="pi pi-user" shape="circle"
                            class="bg-blue-100 text-blue-600 cursor-pointer hover:shadow-md" />
                    </div> -->
                </div>
            </div>
        </header>

        <!-- Floating Sidebar -->
        <Sidebar v-model:visible="sidebarVisible" position="left" class="w-64 shadow-lg border-r border-gray-100"
            :modal="false" :dismissable="true">
            <div class="flex flex-col h-full">
                <!-- Sidebar Header -->
                <div class="px-4 py-6 border-b border-gray-100">
                    <div class="flex items-center space-x-3">
                        <Avatar icon="pi pi-chart-line" size="large" shape="circle" class="bg-blue-500 text-white" />
                        <div>
                            <h2 class="font-semibold text-gray-800">StockFlow</h2>
                            <p class="text-xs text-gray-500">Analytics</p>
                        </div>
                    </div>
                </div>

                <!-- Navigation Menu -->
                <nav class="flex-1 px-2 py-4 space-y-1">
                    <template v-for="item in menuItems" :key="item.label">
                        <router-link :to="item.route" @click="activeItem = item; sidebarVisible = false"
                            class="flex items-center px-3 py-2 rounded-lg transition-colors" :class="{
                                'bg-blue-50 text-blue-600': activeItem.label === item.label,
                                'text-gray-600 hover:bg-gray-100': activeItem.label !== item.label
                            }">
                            <i :class="item.icon" class="mr-3"></i>
                            <span>{{ item.label }}</span>
                        </router-link>
                    </template>
                </nav>

                <!-- Sidebar Footer -->
                <!-- <div class="px-4 py-4 border-t border-gray-100">
                    <Button label="Logout" icon="pi pi-sign-out" text severity="danger" class="w-full justify-start" />
                </div> -->
            </div>
        </Sidebar>

        <!-- Main Content -->
        <main class="flex-1 container mx-auto px-4 py-6">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <!-- Floating Footer -->
        <footer class="bg-white/80 backdrop-blur-sm border-t border-gray-100 py-3">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>© 2023 StockFlow Analytics</span>
                    <div class="flex space-x-4">
                        <a href="#" class="hover:text-gray-700">Terms</a>
                        <a href="#" class="hover:text-gray-700">Privacy</a>
                        <a href="#" class="hover:text-gray-700">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style>
/* Transition effects */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Custom scrollbar for sidebar */
.p-sidebar .p-sidebar-content {
    scrollbar-width: thin;
    scrollbar-color: #e5e7eb #f9fafb;
}

.p-sidebar .p-sidebar-content::-webkit-scrollbar {
    width: 6px;
}

.p-sidebar .p-sidebar-content::-webkit-scrollbar-track {
    background: #f9fafb;
}

.p-sidebar .p-sidebar-content::-webkit-scrollbar-thumb {
    background-color: #e5e7eb;
    border-radius: 3px;
}

/* Floating effect for header and footer */
header,
footer {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>