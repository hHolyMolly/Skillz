//< " ВЫПАДАЮЩИЙ СПИСОК ПОЛЬЗОВАТЕЛЯ " >=============================================================================================================>//
function userShow() {
	const userBtn = document.querySelector(".header-user__dropdown");
	const userBody = document.querySelector(".header-user__body");

	userBtn.addEventListener("click", function () {
		userBtn.classList.toggle("_active");
		userBody.classList.toggle("_active");

		if (window.innerWidth < 768.2) {
			document.body.classList.toggle("_lock-scroll");
		}
	});

	document.addEventListener("click", function (e) {
		const elementTarget = e.target;

		if (userBtn.classList.contains("_active") && userBody.classList.contains("_active") && !elementTarget.closest(".header-action__user")
			|| elementTarget.closest(".header-user__close")) {
			userBtn.classList.remove("_active");
			userBody.classList.remove("_active");
			document.body.classList.remove("_lock-scroll");
		}
	});

	document.addEventListener("keyup", function (e) {
		if (e.code === "Escape") {
			userBtn.classList.remove("_active");
			userBody.classList.remove("_active");
		}
	});
}
userShow()

//< " МЕНЮ БУРГЕР " >=============================================================================================================>//
function мenuBurger() {
	const menuBody = document.querySelector(".header-menu__body");
	const menuBurger = document.querySelector(".header-menu__burger");
	const menuWrapper = document.querySelector(".header-menu__wrapper");

	const body = document.body;

	menuBurger.addEventListener("click", function () {
		menuBody.classList.add("_active");
		menuWrapper.classList.add("_active");
		body.classList.add("_lock-scroll");
	})

	document.addEventListener("click", function (e) {
		const elementTarget = e.target;

		if (elementTarget.closest(".header-menu__wrapper") || elementTarget.closest(".header-menu__close") || elementTarget.closest(".header-menu__logo")) {
			menuBody.classList.remove("_active");
			menuWrapper.classList.remove("_active");
			body.classList.remove("_lock-scroll");
		}
	});
}
мenuBurger()

//< " ПОИСКОВОЙ ЗАПРОС ПО КЛИКУ НА КНОПКУ " >=============================================================================================================>//
function showSearch() {
	const searchOpen = document.querySelector(".header-search__open");
	const searchBody = document.querySelector(".header-search__item");

	searchOpen.addEventListener("click", function () {
		searchBody.classList.toggle('_active');
	});

	document.addEventListener("click", function (e) {
		const elementTarget = e.target;

		if (!elementTarget.closest(".header-search") && searchBody.classList.contains('_active') && window.innerWidth < 552.2) {
			searchBody.classList.remove('_active');
			searchOpen.style.display = "flex";
		}
	});
}
showSearch()

//< " ДОБАВЛЕНИЕ КЛАССА ХЕДЕРУ ПРИ СКРОЛЛЕ " >=============================================================================================================>//
function scrollHeader() {

	const header = document.querySelector('.header');

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			header.classList.remove('_scroll');
		} else {
			header.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(header);

}
scrollHeader()


//< " ДОБАВЛЕНИЕ КЛАССА ХЕДЕРУ ПРИ СКРОЛЛЕ " >=============================================================================================================>//
function menuCategories() {
	const categoriesBtn = document.querySelector(".menu-categories__btn");
	const categoriesList = document.querySelector(".menu-categories__body");
	const body = document.body;

	categoriesBtn.addEventListener("click", function () {

		if (window.innerWidth < 768.2) {
			categoriesBtn.classList.toggle("_active");
			categoriesList.classList.toggle("_active");
			body.classList.toggle("_lock-scroll");
		}
	});

	const categoriesLinks = document.querySelectorAll(".menu-categories__link");

	if (categoriesLinks.length > 0) {
		categoriesLinks.forEach(categoriesLink => {
			categoriesLink.addEventListener("click", function (e) {

				if (window.innerWidth < 768.2) {
					categoriesLink.parentElement.classList.toggle("_active");
					e.preventDefault();
				}

			});

			const categoriesBackBtns = document.querySelectorAll(".menu-categories-sub__back");

			categoriesBackBtns.forEach(categoriesBackBtn => {
				categoriesBackBtn.addEventListener("click", function () {
					categoriesLink.parentElement.classList.remove("_active");
				});
			});

			const categoriesClose = document.querySelector(".menu-categories__close");

			categoriesClose.addEventListener("click", function () {

				if (window.innerWidth < 768.2) {
					categoriesBtn.classList.remove("_active");
					categoriesList.classList.remove("_active");
					body.classList.remove("_lock-scroll");
					categoriesLink.parentElement.classList.remove("_active");
				}
			});
		});
	}
}
menuCategories()

//< " ОСНОВНОЙ СЛАЙДЕР И СЛАЙДЕР КАТЕГОРИЙ " >=============================================================================================================>//
new Swiper(".sale-slider", {
	slidesPerView: 1,
	spaceBetween: 15,
	grabCursor: true,
	loop: true,
	speed: 800,

	// parallax: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},

	navigation: {
		nextEl: ".sale-slider__arrow-next",
		prevEl: ".sale-slider__arrow-prev",
	},

	breakpoints: {
		1440.2: {
			slidesPerView: 5,
			spaceBetween: 30,
		},
		992.2: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
		768.2: {
			slidesPerView: 3,
		},
		425.2: {
			slidesPerView: 2,
		},
	},
});

new Swiper(".cetegiries-slider", {
	slidesPerView: 2,
	spaceBetween: 15,
	grabCursor: true,
	loop: true,
	speed: 300,

	navigation: {
		nextEl: ".cetegiries-slider__arrow-next",
		prevEl: ".cetegiries-slider__arrow-prev",
	},

	breakpoints: {
		992.2: {
			slidesPerView: 6,
			spaceBetween: 20,
		},
		552.2: {
			slidesPerView: 4,
		},
		375.2: {
			slidesPerView: 3,
			spaceBetween: 15,
		},
	},
});

new Swiper(".products-slider", {
	slidesPerView: 2,
	spaceBetween: 10,
	grabCursor: true,
	loop: true,
	speed: 300,

	navigation: {
		nextEl: ".products-slider__arrow-next",
		prevEl: ".products-slider__arrow-prev",
	},

	breakpoints: {
		992.2: {
			slidesPerView: 5,
		},
		552.2: {
			slidesPerView: 3,
		},
		375.2: {
			spaceBetween: 15,
		},
	},
});

//< " БЛОК ПРОДУКТОВ " >=============================================================================================================>//
function products() {

	function productsCalc() {
		const productInpt = document.querySelector('.products-slider-quantity__input');
		const productPlusBtns = document.querySelectorAll('.products-slider-quantity__plus');

		if (productPlusBtns.length > 0) {
			productPlusBtns.forEach(productPlusBtn => {
				productPlusBtn.addEventListener("click", function () {
					let qty = parseInt(productInpt.value);
					if (productInpt.value < 10 || productInpt.value === 10) {
						qty = qty + 1;
					}
					productInpt.value = qty;
				});
			});
		}

		const productMinusBtns = document.querySelectorAll('.products-slider-quantity__minus');

		if (productMinusBtns.length > 0) {
			productMinusBtns.forEach(productMinusBtn => {
				productMinusBtn.addEventListener("click", function () {
					let qty = parseInt(productInpt.value);
					if (productInpt.value > 1) {
						qty = qty - 1;
					}
					productInpt.value = qty;
				});
			});
		}
	}
	productsCalc()

	function productsFavorite() {
		const productFavoriteBtns = document.querySelectorAll(".products-slider-item__favorites");

		if (productFavoriteBtns.length > 0) {
			productFavoriteBtns.forEach(productFavoriteBtn => {
				productFavoriteBtn.addEventListener("click", function () {
					productFavoriteBtn.classList.toggle("_active");
				});
			});
		}
	}
	productsFavorite()

}
products()

//< " ДИНАМИЧЕСКИЙ АДАПТИВ " >=============================================================================================================>//
function dynamicAdaptive() {
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		this.nodes = document.querySelectorAll("[data-da]");

		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const da = new DynamicAdapt("max");
	da.init();

}
dynamicAdaptive()