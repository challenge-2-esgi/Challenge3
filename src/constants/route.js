export default Object.freeze({
    LOGIN: '/login',
    HOME: '/home',
    DASHBOARD: '/home/dashboard',
    ORDERS: '/home/orders',
    USERS: '/home/users',
    COMPLAINTS: '/home/complaints',
    RATINGS: '/home/ratings',
    FLEET: '/home/fleet',
    DELIVERERS: '/home/deliverers',

    // for crud operations
    ITEM_ADD: '/add',
    ITEM_EDIT: '/edit',
    ITEM_VIEW: '/view',

    // segments
    segment: {
        home: {
            dashboard: 'dashboard',
            users: 'users',
            orders: 'orders',
            complaints: 'complaints',
            ratings: 'ratings',
            fleet: 'fleet',
            deliverers: 'deliverers',
        },
    },
})
