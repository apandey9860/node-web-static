function loadAdminLeftNavbar(){

    const sidebar = `
        <div class="sidebar">
        <div class="side-header">EERO</div>
        <div class ="Dashboard">
        <a href="/adminpage" class = "side-font">Dashboard</a>
    </div>
        <ul class="menu">
                
            <a  class ="side-topic">Sales</a> 
            <li>
                <a href="#products" class="dropdown-btn">Products </a>
                <ul class="dropdown-content">
                    <li><a href="/adminproductlist">List</a></li>
                    <li><a href="/productdetails">Details</a></li>
                    <li><a href="/createproduct">Create</a></li>
                    <li><a href="/adminedit">Edit</a></li>
                </ul>
            </li>
            <li>
                <a href="#category" class="dropdown-btn">Category </a>
                <ul class="dropdown-content">
                    <li><a href="/pcategorylist">List</a></li>
                    <li><a href="/pcategorycreate">Create</a></li>
                    <li><a href="/pcategoryedit">Edit</a></li>
                </ul>
            </li>
            <li>
                <a href="#orders" class="dropdown-btn">Orders </a>
                <ul class="dropdown-content">
                    <li><a href="/porderlist">List</a></li>
                    <li><a href="/orderdetail">Details</a></li>
                    <li><a href="/ordercart"> cart</a></li>
                    <li><a href="/ordercheckout">Checkout</a></li>

                </ul>
            </li>
            <li>
                <a href="#inventory" class="dropdown-btn">Inventory </a>
                <ul class="dropdown-content">
                    <li><a href="/inventory">Product Inventory</a></li>
                    <li><a href="/recievedorders">Recieved Orders</a></li>
                    
                </ul>
            </li>
            <a class = "side-topic" >Repairs</a>
            <li>
                <a href="#products" class="dropdown-btn">Products </a>
                <ul class="dropdown-content">
                    <li><a href="/adminproductlist">List</a></li>
                    <li><a href="/productdetails">Details</a></li>
                    <li><a href="/createproduct">Create</a></li>
                    <li><a href="/adminedit">Edit</a></li>
                </ul>
            </li>
            <li>
                <a href="#category" class="dropdown-btn">Category </a>
                <ul class="dropdown-content">
                    <li><a href="/pcategorylist">List</a></li>
                    <li><a href="/pcategorycreate">Create</a></li>
                    <li><a href="/pcategoryedit">Edit</a></li>
                </ul>
            </li>
            <li>
                <a href="#orders" class="dropdown-btn">Orders </a>
                <ul class="dropdown-content">
                    <li><a href="/porderlist">List</a></li>
                    <li><a href="/orderdetail">Details</a></li>
                    <li><a href="/ordercart"> cart</a></li>
                    <li><a href="/ordercheckout">Checkout</a></li>
                </ul>
            </li>
            <li>
                <a href="#inventory" class="dropdown-btn">Inventory </a>
                <ul class="dropdown-content">
                    <li><a href="/inventory">Product Inventory</a></li>
                    <li><a href="/recievedorders">Recieved Orders</a></li>
                </ul>
            </li>
        
        <a class="side-topic">Others</a>
        <li>
            <a href="#products" class="dropdown-btn">Customers </a>
            <ul class="dropdown-content">
                <li><a href="#">Product 1</a></li>
                <li><a href="#">Product 2</a></li>             
            </ul>
        </li>
        
        </ul>
        <div class ="Dashboard">
            <a href="chat" class="side-font">Chat</a>
        </div>
        
        <div class ="Dashboard">
            <a href="chat" class="side-font">Calendar</a>
        </div>
    </div>
    `;

    document.querySelector('.admin-body').insertAdjacentHTML('afterbegin',sidebar);
}

loadAdminLeftNavbar();