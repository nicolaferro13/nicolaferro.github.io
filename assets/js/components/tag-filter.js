// Filtro tag generico, scoped al contenitore più vicino con [data-tag-scope].
// Non serve configurazione: legge i tag dai bottoni .tag-filter-btn e dalle
// card con l'attributo data-tags="tag-uno,tag-due".
document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll("[data-tag-scope]").forEach(function (scope) {
		var buttons = scope.querySelectorAll(".tag-filter-btn");
		var items = scope.querySelectorAll("[data-tags]");

		function applyFilter(selectedTag) {
			items.forEach(function (item) {
				var tags = (item.getAttribute("data-tags") || "").split(",").map(function (t) { return t.trim(); });
				var show = !selectedTag || tags.indexOf(selectedTag) !== -1;
				item.style.display = show ? "" : "none";
			});
		}

		buttons.forEach(function (btn) {
			btn.addEventListener("click", function () {
				var isActive = btn.classList.contains("active");
				buttons.forEach(function (b) { b.classList.remove("active"); });

				if (isActive) {
					// Ricliccando lo stesso filtro attivo, si torna a "mostra tutti"
					applyFilter(null);
				} else {
					btn.classList.add("active");
					applyFilter(btn.getAttribute("data-tag"));
				}
			});
		});
	});
});
