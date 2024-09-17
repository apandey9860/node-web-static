document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    var tradeProduct = document.getElementById("tradeProductPopup");
    var repairProduct = document.getElementById("repairProductPopup");

    // Get the buttons that open the modals
    var openTradeProductBtn = document.getElementById("openTradeProductBtn");
    var openRepairProductBtn = document.getElementById("openRepairProductBtn");

    // When the user clicks the button, open the modal 
    openTradeProductBtn.onclick = function() {
        tradeProduct.style.display = "block";
        fetchProductData();
    }

    openRepairProductBtn.onclick = function() {
        repairProduct.style.display = "block";
        fetchRepairProductData();
    }

    // Get the <span> elements that close the modals
    var closeTradeProduct = document.getElementById("closeTradeProduct");
    var closeRepairProduct = document.getElementById("closeRepairProduct");

    // When the user clicks on <span> (x), close the modal
    closeTradeProduct.onclick = function() {
        tradeProduct.style.display = "none";
    }

    closeRepairProduct.onclick = function() {
        repairProduct.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === tradeProduct) {
            tradeProduct.style.display = "none";
        }
        if (event.target === repairProduct) {
            repairProduct.style.display = "none";
        }
    }
});