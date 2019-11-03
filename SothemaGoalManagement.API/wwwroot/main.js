(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_directives/hasRole.directive.ts":
/*!**************************************************!*\
  !*** ./src/app/_directives/hasRole.directive.ts ***!
  \**************************************************/
/*! exports provided: HasRoleDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HasRoleDirective", function() { return HasRoleDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HasRoleDirective = /** @class */ (function () {
    function HasRoleDirective(viewContainerRef, templateRef, authService) {
        this.viewContainerRef = viewContainerRef;
        this.templateRef = templateRef;
        this.authService = authService;
        this.isVisible = false;
    }
    HasRoleDirective.prototype.ngOnInit = function () {
        var userRoles = this.authService.decodedToken.role;
        if (!userRoles) {
            this.viewContainerRef.clear();
        }
        if (this.authService.roleMatch(this.appHasRole)) {
            if (!this.isVisible) {
                this.isVisible = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
            else {
                this.isVisible = false;
                this.viewContainerRef.clear();
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], HasRoleDirective.prototype, "appHasRole", void 0);
    HasRoleDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appHasRole]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"], _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], HasRoleDirective);
    return HasRoleDirective;
}());



/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router, alertify) {
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
    }
    AuthGuard.prototype.canActivate = function (next) {
        var roles = next.firstChild.data['roles'];
        if (roles) {
            var match = this.authService.roleMatch(roles);
            if (match) {
                return true;
            }
            else {
                this.router.navigate(['/']);
                this.alertify.error('Vous n\'êtes pas autorisé à accéder à cette zone');
            }
        }
        if (this.authService.loggedIn()) {
            return true;
        }
        this.alertify.error('Vous ne pouvez pas passer!!!');
        this.router.navigate(['/']);
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_guards/prevent-unsave-changes-guards.ts":
/*!**********************************************************!*\
  !*** ./src/app/_guards/prevent-unsave-changes-guards.ts ***!
  \**********************************************************/
/*! exports provided: PreventUnsavedChanges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreventUnsavedChanges", function() { return PreventUnsavedChanges; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PreventUnsavedChanges = /** @class */ (function () {
    function PreventUnsavedChanges() {
    }
    PreventUnsavedChanges.prototype.canDeactivate = function (component) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    };
    PreventUnsavedChanges = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], PreventUnsavedChanges);
    return PreventUnsavedChanges;
}());



/***/ }),

/***/ "./src/app/_models/pagination.ts":
/*!***************************************!*\
  !*** ./src/app/_models/pagination.ts ***!
  \***************************************/
/*! exports provided: PaginatedResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginatedResult", function() { return PaginatedResult; });
var PaginatedResult = /** @class */ (function () {
    function PaginatedResult() {
    }
    return PaginatedResult;
}());



/***/ }),

/***/ "./src/app/_resolvers/behavioral-skill-detail.resolver..ts":
/*!*****************************************************************!*\
  !*** ./src/app/_resolvers/behavioral-skill-detail.resolver..ts ***!
  \*****************************************************************/
/*! exports provided: BehavioralSkillDetailResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BehavioralSkillDetailResolver", function() { return BehavioralSkillDetailResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BehavioralSkillDetailResolver = /** @class */ (function () {
    function BehavioralSkillDetailResolver(hrService, router, alertify) {
        this.hrService = hrService;
        this.router = router;
        this.alertify = alertify;
    }
    BehavioralSkillDetailResolver.prototype.resolve = function (route) {
        var _this = this;
        return this.hrService.getBehavioralSkill(route.params['id']).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
            _this.alertify.error('Problème lors de la récupération des données de votre compétence comportementale');
            _this.router.navigate(['/hr']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }));
    };
    BehavioralSkillDetailResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_hr_service__WEBPACK_IMPORTED_MODULE_4__["HrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], BehavioralSkillDetailResolver);
    return BehavioralSkillDetailResolver;
}());



/***/ }),

/***/ "./src/app/_resolvers/collaborator-detail.resolver..ts":
/*!*************************************************************!*\
  !*** ./src/app/_resolvers/collaborator-detail.resolver..ts ***!
  \*************************************************************/
/*! exports provided: CollaboratorDetailResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollaboratorDetailResolver", function() { return CollaboratorDetailResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CollaboratorDetailResolver = /** @class */ (function () {
    function CollaboratorDetailResolver(adminService, router, alertify) {
        this.adminService = adminService;
        this.router = router;
        this.alertify = alertify;
    }
    CollaboratorDetailResolver.prototype.resolve = function (route) {
        var _this = this;
        return this.adminService.getUser(route.params['id']).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
            _this.alertify.error('Problème lors de la récupération des données de votre utilisateur');
            _this.router.navigate(['/admin']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }));
    };
    CollaboratorDetailResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], CollaboratorDetailResolver);
    return CollaboratorDetailResolver;
}());



/***/ }),

/***/ "./src/app/_resolvers/collaborator-list.resolver.ts":
/*!**********************************************************!*\
  !*** ./src/app/_resolvers/collaborator-list.resolver.ts ***!
  \**********************************************************/
/*! exports provided: CollaboratorListResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollaboratorListResolver", function() { return CollaboratorListResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CollaboratorListResolver = /** @class */ (function () {
    function CollaboratorListResolver(adminService, router, alertify) {
        this.adminService = adminService;
        this.router = router;
        this.alertify = alertify;
        this.pageNumber = 1;
        this.pageSize = 10;
    }
    CollaboratorListResolver.prototype.resolve = function (route) {
        var _this = this;
        var departmentList = localStorage.getItem('departmentList');
        var userStatusList = localStorage.getItem('userStatusList');
        if (departmentList && userStatusList) {
            this.adminService.getUsersWithRoles(this.pageNumber, this.pageSize)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (result) {
                return {
                    departmentList: JSON.parse(departmentList),
                    userStatusList: JSON.parse(userStatusList),
                    users: result
                };
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
                _this.alertify.error('Problème lors de la récupération des données des utilisateurs');
                _this.router.navigate(['/home']);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
            }));
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["forkJoin"])([
            this.adminService.getDepartments(),
            this.adminService.getUserStatus(),
            this.adminService.getUsersWithRoles(this.pageNumber, this.pageSize)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
                _this.alertify.error('Problème lors de la récupération des données des utilisateurs');
                _this.router.navigate(['/home']);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
            }))
        ]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (result) {
            localStorage.setItem('departmentList', JSON.stringify(result[0]));
            localStorage.setItem('userStatusList', JSON.stringify(result[1]));
            return {
                departmentList: result[0],
                userStatusList: result[1],
                users: result[2]
            };
        }));
    };
    CollaboratorListResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], CollaboratorListResolver);
    return CollaboratorListResolver;
}());



/***/ }),

/***/ "./src/app/_resolvers/evaluation-hr-detail.resolver.ts":
/*!*************************************************************!*\
  !*** ./src/app/_resolvers/evaluation-hr-detail.resolver.ts ***!
  \*************************************************************/
/*! exports provided: EvaluationHrDetailResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationHrDetailResolver", function() { return EvaluationHrDetailResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EvaluationHrDetailResolver = /** @class */ (function () {
    function EvaluationHrDetailResolver(hrService, router, alertify) {
        this.hrService = hrService;
        this.router = router;
        this.alertify = alertify;
    }
    EvaluationHrDetailResolver.prototype.resolve = function (route) {
        var _this = this;
        return this.hrService.getEvaluationFile(route.params['id']).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
            _this.alertify.error('Problème lors de la récupération des données de votre fiche d\'évaluation');
            _this.router.navigate(['/hr']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }));
    };
    EvaluationHrDetailResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_hr_service__WEBPACK_IMPORTED_MODULE_4__["HrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], EvaluationHrDetailResolver);
    return EvaluationHrDetailResolver;
}());



/***/ }),

/***/ "./src/app/_resolvers/messages.resolver.ts":
/*!*************************************************!*\
  !*** ./src/app/_resolvers/messages.resolver.ts ***!
  \*************************************************/
/*! exports provided: MessagesResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesResolver", function() { return MessagesResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MessagesResolver = /** @class */ (function () {
    function MessagesResolver(userService, authService, router, alertify) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
        this.pageNumber = 1;
        this.pageSize = 10;
        this.messageContainer = 'Unread';
    }
    MessagesResolver.prototype.resolve = function (route) {
        var _this = this;
        return this.userService
            .getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
            _this.alertify.error('Problem retrieving messages');
            _this.router.navigate(['/home']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }));
    };
    MessagesResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], MessagesResolver);
    return MessagesResolver;
}());



/***/ }),

/***/ "./src/app/_resolvers/profile-edit.resolver.ts":
/*!*****************************************************!*\
  !*** ./src/app/_resolvers/profile-edit.resolver.ts ***!
  \*****************************************************/
/*! exports provided: ProfileEditResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileEditResolver", function() { return ProfileEditResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProfileEditResolver = /** @class */ (function () {
    function ProfileEditResolver(userService, authService, router, alertify) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
    }
    ProfileEditResolver.prototype.resolve = function (route) {
        var _this = this;
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
            _this.alertify.error('Problème de récupération de vos données');
            _this.router.navigate(['/home']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }));
    };
    ProfileEditResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], ProfileEditResolver);
    return ProfileEditResolver;
}());



/***/ }),

/***/ "./src/app/_resolvers/sheet-detail.resolver.ts":
/*!*****************************************************!*\
  !*** ./src/app/_resolvers/sheet-detail.resolver.ts ***!
  \*****************************************************/
/*! exports provided: SheetDetailResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SheetDetailResolver", function() { return SheetDetailResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SheetDetailResolver = /** @class */ (function () {
    function SheetDetailResolver(userService, authService, router, alertify) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
    }
    SheetDetailResolver.prototype.resolve = function (route) {
        var _this = this;
        var goalTypeList = localStorage.getItem('goalTypeList');
        var userId = this.authService.decodedToken.nameid;
        if (goalTypeList) {
            this.userService.getMySheet(route.params['id'], userId)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (result) {
                return {
                    goalTypeList: JSON.parse(goalTypeList),
                    sheetDetail: result
                };
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
                _this.alertify.error('Problème lors de la récupération des données de votre fiche d\'evaluation');
                _this.router.navigate(['/sheets']);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
            }));
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["forkJoin"])([
            this.userService.getGoalTypes(userId),
            this.userService.getMySheet(route.params['id'], userId)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
                _this.alertify.error('Problème lors de la récupération des données devotre fiche d\'evaluation');
                _this.router.navigate(['/sheets']);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
            }))
        ]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (result) {
            localStorage.setItem('goalTypeList', JSON.stringify(result[0]));
            return {
                goalTypeList: result[0],
                sheetDetail: result[1]
            };
        }));
    };
    SheetDetailResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], SheetDetailResolver);
    return SheetDetailResolver;
}());



/***/ }),

/***/ "./src/app/_resolvers/sheets.resolver.ts":
/*!***********************************************!*\
  !*** ./src/app/_resolvers/sheets.resolver.ts ***!
  \***********************************************/
/*! exports provided: SheetsResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SheetsResolver", function() { return SheetsResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SheetsResolver = /** @class */ (function () {
    function SheetsResolver(userService, authService, router, alertify) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
        this.pageNumber = 1;
        this.pageSize = 10;
    }
    SheetsResolver.prototype.resolve = function (route) {
        var _this = this;
        return this.userService
            .getMySheets(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
            _this.alertify.error('Problème lors de la récupération des données de votre fiches d\'évaluation');
            _this.router.navigate(['/hr']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }));
    };
    SheetsResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], SheetsResolver);
    return SheetsResolver;
}());



/***/ }),

/***/ "./src/app/_resolvers/strategies.resolver.ts":
/*!***************************************************!*\
  !*** ./src/app/_resolvers/strategies.resolver.ts ***!
  \***************************************************/
/*! exports provided: StrategiesResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategiesResolver", function() { return StrategiesResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StrategiesResolver = /** @class */ (function () {
    function StrategiesResolver(hrService, router, alertify) {
        this.hrService = hrService;
        this.router = router;
        this.alertify = alertify;
    }
    StrategiesResolver.prototype.resolve = function (route) {
        var _this = this;
        return this.hrService
            .getPublishedStrategies()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
            _this.alertify.error('Problem retrieving Strategies');
            _this.router.navigate(['/home']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }));
    };
    StrategiesResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_hr_service__WEBPACK_IMPORTED_MODULE_4__["HrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], StrategiesResolver);
    return StrategiesResolver;
}());



/***/ }),

/***/ "./src/app/_resolvers/strategy-detail.resolver.ts":
/*!********************************************************!*\
  !*** ./src/app/_resolvers/strategy-detail.resolver.ts ***!
  \********************************************************/
/*! exports provided: StrategyDetailResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyDetailResolver", function() { return StrategyDetailResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var StrategyDetailResolver = /** @class */ (function () {
    function StrategyDetailResolver(hrService, authService, router, alertify) {
        this.hrService = hrService;
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
    }
    StrategyDetailResolver.prototype.resolve = function (route) {
        var _this = this;
        return this.hrService.getStrategy(route.params['id'], this.authService.decodedToken.nameid).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
            _this.alertify.error('Problème lors de la récupération des données de votre stratégie');
            _this.router.navigate(['/hr']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }));
    };
    StrategyDetailResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_hr_service__WEBPACK_IMPORTED_MODULE_4__["HrService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], StrategyDetailResolver);
    return StrategyDetailResolver;
}());



/***/ }),

/***/ "./src/app/_resolvers/strategy-list.resolver.ts":
/*!******************************************************!*\
  !*** ./src/app/_resolvers/strategy-list.resolver.ts ***!
  \******************************************************/
/*! exports provided: StrategyListResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyListResolver", function() { return StrategyListResolver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var StrategyListResolver = /** @class */ (function () {
    function StrategyListResolver(hrService, authService, router, alertify) {
        this.hrService = hrService;
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
        this.pageNumber = 1;
        this.pageSize = 10;
    }
    StrategyListResolver.prototype.resolve = function (route) {
        var _this = this;
        return this.hrService.getStrategies(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
            _this.alertify.error('Problème lors de la récupération des données des strategies');
            _this.router.navigate(['/home']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }));
    };
    StrategyListResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_services_hr_service__WEBPACK_IMPORTED_MODULE_4__["HrService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_6__["AlertifyService"]])
    ], StrategyListResolver);
    return StrategyListResolver;
}());



/***/ }),

/***/ "./src/app/_services/admin.service.ts":
/*!********************************************!*\
  !*** ./src/app/_services/admin.service.ts ***!
  \********************************************/
/*! exports provided: AdminService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminService", function() { return AdminService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../_models/pagination */ "./src/app/_models/pagination.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
    }
    AdminService.prototype.getUsers = function (page, itemsPerPage, userParams) {
        var paginatedResult = new _models_pagination__WEBPACK_IMPORTED_MODULE_3__["PaginatedResult"]();
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        if (userParams != null) {
            params = params.append('departmentId', userParams.departmentId);
            params = params.append('userStatusId', userParams.userStatusId);
            params = params.append('userToSearch', userParams.userToSearch);
            params = params.append('orderBy', userParams.orderBy);
        }
        return this.http
            .get(this.baseUrl + 'users', { observe: 'response', params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    };
    AdminService.prototype.getUser = function (id) {
        return this.http.get(this.baseUrl + 'users/' + id);
    };
    AdminService.prototype.updateUser = function (user) {
        return this.http.put(this.baseUrl + 'admin/', user);
    };
    AdminService.prototype.createUser = function (notifyUser, user) {
        return this.http.post(this.baseUrl + 'admin/register/' + notifyUser, user);
    };
    AdminService.prototype.getUsersWithRoles = function (page, itemsPerPage, userParams) {
        var paginatedResult = new _models_pagination__WEBPACK_IMPORTED_MODULE_3__["PaginatedResult"]();
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        if (userParams != null && userParams.departmentId !== undefined && userParams.userStatusId !== undefined) {
            params = params.append('departmentId', userParams.departmentId);
            params = params.append('userStatusId', userParams.userStatusId);
            params = params.append('userToSearch', userParams.userToSearch);
            params = params.append('orderBy', userParams.orderBy);
        }
        return this.http
            .get(this.baseUrl + 'admin/usersWithRoles', { observe: 'response', params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    };
    AdminService.prototype.getDepartments = function () {
        return this.http.get(this.baseUrl + 'admin/departments');
    };
    AdminService.prototype.getUserStatus = function () {
        return this.http.get(this.baseUrl + 'admin/userStatus');
    };
    AdminService.prototype.updateUserRoles = function (user, roles) {
        return this.http.post(this.baseUrl + 'admin/editRoles/' + user.id, roles);
    };
    AdminService.prototype.getPhotosForApproval = function () {
        return this.http.get(this.baseUrl + 'admin/photosForModeration');
    };
    AdminService.prototype.approvePhoto = function (photoId) {
        return this.http.post(this.baseUrl + 'admin/approvePhoto/' + photoId, {});
    };
    AdminService.prototype.rejectPhoto = function (photoId) {
        return this.http.post(this.baseUrl + 'admin/rejectPhoto/' + photoId, {});
    };
    AdminService.prototype.emailAlreadyExists = function (email) {
        return this.http.get(this.baseUrl + "admin/emailAlreadyExists?email=" + email);
    };
    AdminService.prototype.employeeNumberAlreadyExists = function (employeeNumber) {
        return this.http.get(this.baseUrl + "admin/employeeNumberAlreadyExists?employeeNumber=" + employeeNumber);
    };
    AdminService.prototype.searchUsers = function (searchTerm) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        params = params.append('userToSearch', searchTerm.userToSearch);
        params = params.append('userStatusId', searchTerm.userStatusId.toString());
        return this.http.get(this.baseUrl + 'admin/searchUsers', { params: params });
    };
    AdminService.prototype.addEvaluatorToUser = function (evaluatedId, evaluatorIds) {
        return this.http.post(this.baseUrl + "admin/addEvaluatorToUser/" + evaluatedId, evaluatorIds);
    };
    AdminService.prototype.addEvaluateeToUser = function (evaluatorId, evaluateeIds) {
        return this.http.post(this.baseUrl + "admin/addEvaluateeToUser/" + evaluatorId, evaluateeIds);
    };
    AdminService.prototype.updateRankOfEvaluator = function (evaluatedId, evaluatorId, rank) {
        return this.http.put(this.baseUrl + "admin/updateRankOfEvaluator/" + evaluatedId + "/" + evaluatorId + "/" + rank, {});
    };
    AdminService.prototype.loadEvaluators = function (evaluatedId) {
        return this.http.get(this.baseUrl + "admin/loadEvaluators/" + evaluatedId);
    };
    AdminService.prototype.loadEvaluatees = function (evaluatorId) {
        return this.http.get(this.baseUrl + "admin/loadEvaluatees/" + evaluatorId);
    };
    AdminService.prototype.deleteEvaluator = function (evaluatorId, evaluatedId) {
        return this.http.delete(this.baseUrl + "admin/deleteEvaluator/" + evaluatorId + "/" + evaluatedId);
    };
    AdminService.prototype.deleteEvaluatee = function (evaluatedId, evaluatorId) {
        return this.http.delete(this.baseUrl + "admin/deleteEvaluatee/" + evaluatedId + "/" + evaluatorId);
    };
    AdminService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AdminService);
    return AdminService;
}());



/***/ }),

/***/ "./src/app/_services/alertify.service.ts":
/*!***********************************************!*\
  !*** ./src/app/_services/alertify.service.ts ***!
  \***********************************************/
/*! exports provided: AlertifyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertifyService", function() { return AlertifyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AlertifyService = /** @class */ (function () {
    function AlertifyService() {
    }
    AlertifyService.prototype.confirm = function (message, okCallback) {
        alertify.confirm(message, function (e) {
            if (e) {
                okCallback();
            }
            else {
            }
        });
    };
    AlertifyService.prototype.success = function (message) {
        alertify.success(message);
    };
    AlertifyService.prototype.error = function (message) {
        alertify.error(message);
    };
    AlertifyService.prototype.warning = function (message) {
        alertify.warning(message);
    };
    AlertifyService.prototype.message = function (message) {
        alertify.message(message);
    };
    AlertifyService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], AlertifyService);
    return AlertifyService;
}());



/***/ }),

/***/ "./src/app/_services/auth.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/auth.service.ts ***!
  \*******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + 'auth/';
        this.jwtHelper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtHelperService"]();
        this.photoUrl = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]('../../assets/user.png');
        this.currentPhotoUrl = this.photoUrl.asObservable();
    }
    AuthService.prototype.changeMemberPhoto = function (photoUrl) {
        this.photoUrl.next(photoUrl);
    };
    AuthService.prototype.login = function (model) {
        var _this = this;
        return this.http.post(this.baseUrl + 'login', model).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            var user = response;
            if (user) {
                localStorage.setItem('token', user.token);
                localStorage.setItem('user', JSON.stringify(user.user));
                _this.decodedToken = _this.jwtHelper.decodeToken(user.token);
                _this.currentUser = user.user;
                _this.changeMemberPhoto(_this.currentUser.photoUrl);
            }
        }));
    };
    AuthService.prototype.loggedIn = function () {
        var token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    };
    AuthService.prototype.roleMatch = function (allowedRoles) {
        var isMatch = false;
        var userRoles = this.decodedToken.role;
        allowedRoles.forEach(function (element) {
            if (userRoles.includes(element)) {
                isMatch = true;
                return;
            }
        });
        return isMatch;
    };
    AuthService.prototype.resetPassword = function (model) {
        return this.http.post(this.baseUrl + "resetPassword", model);
    };
    AuthService.prototype.requestResetPassword = function (model) {
        return this.http.post(this.baseUrl + "generatePasswordResetToken", model);
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/_services/error.interceptor.ts":
/*!************************************************!*\
  !*** ./src/app/_services/error.interceptor.ts ***!
  \************************************************/
/*! exports provided: ErrorInterceptor, ErrorInterceptorProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptorProvider", function() { return ErrorInterceptorProvider; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor() {
    }
    ErrorInterceptor.prototype.intercept = function (req, next) {
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) {
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpErrorResponse"]) {
                if (error.status === 401) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error.statusText);
                }
                var applicationError = error.headers.get('Application-Error');
                if (applicationError) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(applicationError);
                }
                var serverError = error.error;
                var modalStateErrors = '';
                if (serverError && typeof serverError == 'object') {
                    for (var key in serverError) {
                        if (serverError[key]) {
                            modalStateErrors += serverError[key] + '\n';
                        }
                    }
                }
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(modalStateErrors || serverError || 'Server Error');
            }
        }));
    };
    ErrorInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());

var ErrorInterceptorProvider = {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HTTP_INTERCEPTORS"],
    useClass: ErrorInterceptor,
    multi: true
};


/***/ }),

/***/ "./src/app/_services/hr.service.ts":
/*!*****************************************!*\
  !*** ./src/app/_services/hr.service.ts ***!
  \*****************************************/
/*! exports provided: HrService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HrService", function() { return HrService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_models/pagination */ "./src/app/_models/pagination.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HrService = /** @class */ (function () {
    function HrService(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl;
        this.efiBSList = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this.efiObservableList = this.efiBSList.asObservable();
    }
    HrService.prototype.getStrategy = function (id, ownerId) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        params = params.append('ownerId', ownerId);
        return this.http.get(this.baseUrl + "hr/strategy/" + id, { params: params });
    };
    HrService.prototype.getStrategies = function (id, page, itemsPerPage, strategyParams) {
        var paginatedResult = new _models_pagination__WEBPACK_IMPORTED_MODULE_4__["PaginatedResult"]();
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        params = params.append('ownerId', id);
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        if (strategyParams != null) {
            params = params.append('status', strategyParams.status);
            params = params.append('orderBy', strategyParams.orderBy);
        }
        return this.http
            .get(this.baseUrl + 'hr/strategy', { observe: 'response', params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    };
    HrService.prototype.getPublishedStrategies = function () {
        return this.http.get(this.baseUrl + "hr/strategy/publishedStrategies");
    };
    HrService.prototype.getPublishedBehavioralSkills = function () {
        return this.http.get(this.baseUrl + "hr/behavioralSkill/publishedBehavioralSkills");
    };
    HrService.prototype.createStrategy = function (ownerId, strategy) {
        return this.http.post(this.baseUrl + "hr/strategy/new/" + ownerId, strategy);
    };
    HrService.prototype.cloneStrategy = function (ownerId, strategyId) {
        return this.http.post(this.baseUrl + "hr/strategy/clone/" + ownerId + "/" + strategyId, {});
    };
    HrService.prototype.deleteStrategy = function (id) {
        return this.http.delete(this.baseUrl + "hr/strategy/delete/" + id);
    };
    HrService.prototype.deleteStrategyDocument = function (id) {
        return this.http.post(this.baseUrl + 'hr/strategy/documentation/delete/' + id, {});
    };
    HrService.prototype.updateStrategy = function (ownerId, strategy) {
        return this.http.put(this.baseUrl + "hr/strategy/edit/" + ownerId, strategy);
    };
    HrService.prototype.getAxisList = function (strategyId) {
        return this.http.get(this.baseUrl + 'hr/axis/axisList/' + strategyId);
    };
    HrService.prototype.getAxisPoleList = function (axisId) {
        return this.http.get(this.baseUrl + 'hr/axis/axisPoleList/' + axisId);
    };
    HrService.prototype.addAxis = function (axis) {
        return this.http.post(this.baseUrl + 'hr/axis/addAxis', axis);
    };
    HrService.prototype.updateAxis = function (id, axis) {
        return this.http.put(this.baseUrl + 'hr/axis/updateAxis/' + id, axis);
    };
    HrService.prototype.deleteAxis = function (id, userId) {
        return this.http.delete(this.baseUrl + "hr/axis/axis/" + id + "/delete/" + userId);
    };
    HrService.prototype.updateAxisPoleWeigth = function (axisId, poleId, weight) {
        return this.http.put(this.baseUrl + "hr/axis/updateAxisPole/" + axisId + "/" + poleId + "/" + weight, {});
    };
    HrService.prototype.getBehavioralSkills = function (createdById, filters) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        params = params.append('ownerId', createdById);
        if (filters != null) {
            params = params.append('status', filters.status);
            params = params.append('orderBy', filters.orderBy);
        }
        return this.http.get(this.baseUrl + "hr/behavioralSkill", { params: params });
    };
    HrService.prototype.cloneBehavioralSkill = function (ownerId, behavioralSkillId) {
        return this.http.post(this.baseUrl + "hr/behavioralSkill/clone/" + ownerId + "/" + behavioralSkillId, {});
    };
    HrService.prototype.deleteBehavioralSkill = function (id) {
        return this.http.delete(this.baseUrl + "hr/behavioralSkill/delete/" + id);
    };
    HrService.prototype.updateBehavioralSkill = function (createdById, behavioralSkill) {
        return this.http.put(this.baseUrl + "hr/behavioralSkill/edit/" + createdById, behavioralSkill);
    };
    HrService.prototype.getBehavioralSkill = function (id) {
        return this.http.get(this.baseUrl + "hr/behavioralSkill/" + id);
    };
    HrService.prototype.createBehavioralSkill = function (createdById, behavioralSkill) {
        return this.http.post(this.baseUrl + "hr/behavioralSkill/new/" + createdById, behavioralSkill);
    };
    HrService.prototype.getEvaluationFiles = function (ownerId, filters) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        params = params.append('ownerId', ownerId);
        if (filters != null) {
            params = params.append('status', filters.status);
            params = params.append('orderBy', filters.orderBy);
        }
        return this.http.get(this.baseUrl + "hr/evaluationfile", { params: params });
    };
    HrService.prototype.updateEvaluationFile = function (ownerId, evaluationFile) {
        return this.http.put(this.baseUrl + "hr/evaluationfile/edit/" + ownerId, evaluationFile);
    };
    HrService.prototype.getEvaluationFile = function (id) {
        return this.http.get(this.baseUrl + "hr/evaluationfile/" + id);
    };
    HrService.prototype.createEvaluationFile = function (ownerId, newEvaluationFile) {
        return this.http.post(this.baseUrl + "hr/evaluationfile/new/" + ownerId, newEvaluationFile);
    };
    HrService.prototype.generateEvaluationFile = function (evaluationFileId, users) {
        return this.http.post(this.baseUrl + "hr/evaluationfile/generate/" + evaluationFileId, users);
    };
    HrService.prototype.changeEfiList = function (efilist) {
        this.efiBSList.next(efilist);
    };
    HrService.prototype.getEvaluationFileInstancesByEvaluationFileId = function (evaluationFileId) {
        var _this = this;
        return this.http.get(this.baseUrl + "hr/evaluationFile/evaluationFileInstances/" + evaluationFileId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (result) {
            _this.changeEfiList(result);
        }));
    };
    HrService.prototype.updateAxisInstance = function (userId, axisInstanceId, userWeight) {
        return this.http.put(this.baseUrl + "hr/evaluationfile/axisInstance/edit/" + userId + "/" + axisInstanceId + "/" + userWeight, {});
    };
    HrService.prototype.deleteEvaluationFileInstance = function (id, userId) {
        return this.http.delete(this.baseUrl + "hr/evaluationFile/evaluationFileInstance/" + id + "/delete/" + userId);
    };
    HrService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], HrService);
    return HrService;
}());



/***/ }),

/***/ "./src/app/_services/layout.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/layout.service.ts ***!
  \*********************************************/
/*! exports provided: LayoutService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutService", function() { return LayoutService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LayoutService = /** @class */ (function () {
    function LayoutService(router) {
        var _this = this;
        this.router = router;
        this.isNavigationPending$ = this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (event) { return _this.isConsideredEvent(event); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (event) { return _this.isNavigationStart(event); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
    }
    LayoutService.prototype.isConsideredEvent = function (event) {
        return this.isNavigationStart(event)
            || this.isNavigationEnd(event);
    };
    LayoutService.prototype.isNavigationStart = function (event) {
        return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationStart"];
    };
    LayoutService.prototype.isNavigationEnd = function (event) {
        return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]
            || event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationCancel"]
            || event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationError"];
    };
    LayoutService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LayoutService);
    return LayoutService;
}());



/***/ }),

/***/ "./src/app/_services/user.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/user.service.ts ***!
  \*******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _models_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../_models/pagination */ "./src/app/_models/pagination.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl;
    }
    UserService.prototype.getUser = function (id) {
        return this.http.get(this.baseUrl + 'users/' + id);
    };
    UserService.prototype.loadAllUsers = function () {
        return this.http.get(this.baseUrl + 'users/loadAllUsers');
    };
    UserService.prototype.updateProfile = function (id, user) {
        return this.http.put(this.baseUrl + 'users/' + id, user);
    };
    UserService.prototype.setMainPhoto = function (userId, id) {
        return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
    };
    UserService.prototype.deletePhoto = function (userId, id) {
        return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
    };
    UserService.prototype.getMessages = function (id, page, itemsPerPage, messageContainer) {
        var paginatedResult = new _models_pagination__WEBPACK_IMPORTED_MODULE_4__["PaginatedResult"]();
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpParams"]();
        params = params.append('MessageContainer', messageContainer);
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        return this.http
            .get(this.baseUrl + 'users/' + id + '/messages', {
            observe: 'response',
            params: params
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    };
    UserService.prototype.getMessageThread = function (id, recipientId) {
        return this.http.get(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
    };
    UserService.prototype.sendMessage = function (id, message) {
        return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
    };
    UserService.prototype.deleteMessage = function (id, userId) {
        return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
    };
    UserService.prototype.markAsRead = function (userId, messageId) {
        this.http
            .post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
            .subscribe();
    };
    UserService.prototype.getMySheets = function (userId, page, itemsPerPage) {
        var paginatedResult = new _models_pagination__WEBPACK_IMPORTED_MODULE_4__["PaginatedResult"]();
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpParams"]();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        return this.http
            .get(this.baseUrl + 'users/' + userId + '/objectives', {
            observe: 'response',
            params: params
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    };
    UserService.prototype.getMySheet = function (id, userId) {
        return this.http.get(this.baseUrl + 'users/' + userId + '/objectives/mysheet/' + id);
    };
    UserService.prototype.getGoalsForAxis = function (userId, axisInstanceIds) {
        return this.http.post(this.baseUrl + "users/" + userId + "/objectives", axisInstanceIds);
    };
    UserService.prototype.createGoal = function (userId, goal) {
        return this.http.post(this.baseUrl + "users/" + userId + "/objectives/createGoal", goal);
    };
    UserService.prototype.updateGoal = function (id, userId, goal) {
        return this.http.put(this.baseUrl + "users/" + userId + "/objectives/editGoal/" + id, goal);
    };
    UserService.prototype.deleteGoal = function (id, userId) {
        return this.http.delete(this.baseUrl + "users/" + userId + "/objectives/deleteGoal/" + id);
    };
    UserService.prototype.getGoalTypes = function (userId) {
        return this.http.get(this.baseUrl + "users/" + userId + "/objectives/goalTypes");
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/admin/admin-filter-actions/admin-filter-actions.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/admin-filter-actions/admin-filter-actions.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/admin-filter-actions/admin-filter-actions.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/admin/admin-filter-actions/admin-filter-actions.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <form #form=\"ngForm\" (ngSubmit)=\"loadData()\" novalidate>\n    <div class=\"form-row align-items-center\">\n      <div class=\"col-auto\">\n        <label class=\"sr-only\" for=\"department\">Direction:</label>\n        <select [(ngModel)]=\"filters.departmentId\" class=\"form-control\" style=\"width: 150px\" id=\"department\" name=\"department\">\n          <option value=\"0\">Toutes les dirctions</option>\n          <option *ngFor=\"let dpt of departmentList\" [value]=\"dpt.id\">\n            {{ dpt.name }}\n          </option>\n        </select>\n      </div>\n\n      <div class=\"col-auto\">\n        <label class=\"sr-only\" for=\"userStatus\">Statut:</label>\n        <select [(ngModel)]=\"filters.userStatusId\" class=\"form-control\" style=\"width: 150px\" id=\"userStatus\" name=\"userStatus\">\n          <option value=\"0\">Toutes les Statuts</option>\n          <option *ngFor=\"let status of userStatusList\" [value]=\"status.id\">\n            {{ status.name }}\n          </option>\n        </select>\n      </div>\n\n      <div class=\"col-auto\">\n        <label class=\"sr-only\" for=\"userToSearch\">Nom:</label>\n        <input type=\"text\" [(ngModel)]=\"filters.userToSearch\" class=\"form-control\" style=\"width: 150px\" id=\"userToSearch\" name=\"userToSearch\"\n          placeholder=\"Nom à rechercher\">\n      </div>\n\n      <div class=\"col-auto\">\n        <button type=\"submit\" class=\"btn btn-primary\" style=\"margin-left:10px\">\n          Appliquer\n        </button>\n      </div>\n      <div class=\"col-auto\">\n        <button type=\"button\" class=\"btn btn-info\" style=\"margin-left:10px\" (click)=\"resetFilters()\">\n          Réinitialiser\n        </button>\n      </div>\n\n      <div class=\"col-auto\">\n        <button type=\"button\" class=\"btn btn-primary\" style=\"margin-left:10px\" (click)=\"creationToggle()\">\n          Nouveau\n        </button>\n      </div>\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/admin-filter-actions/admin-filter-actions.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/admin-filter-actions/admin-filter-actions.component.ts ***!
  \******************************************************************************/
/*! exports provided: AdminFilterActionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminFilterActionsComponent", function() { return AdminFilterActionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AdminFilterActionsComponent = /** @class */ (function () {
    function AdminFilterActionsComponent() {
        this.loadDataEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.creationModeEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.filters = {};
    }
    AdminFilterActionsComponent.prototype.ngOnInit = function () {
        this.filters.departmentId = 0;
        this.filters.userStatusId = 0;
        this.filters.userToSearch = "";
        this.filters.orderBy = 'lastActive';
    };
    AdminFilterActionsComponent.prototype.resetFilters = function () {
        this.filters.departmentId = 0;
        this.filters.userStatusId = 0;
        this.filters.userToSearch = "";
        this.loadDataEvent.emit(this.filters);
    };
    AdminFilterActionsComponent.prototype.creationToggle = function () {
        this.creationModeEvent.emit(true);
    };
    AdminFilterActionsComponent.prototype.loadData = function () {
        this.loadDataEvent.emit(this.filters);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], AdminFilterActionsComponent.prototype, "departmentList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], AdminFilterActionsComponent.prototype, "userStatusList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AdminFilterActionsComponent.prototype, "loadDataEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AdminFilterActionsComponent.prototype, "creationModeEvent", void 0);
    AdminFilterActionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-filter-actions',
            template: __webpack_require__(/*! ./admin-filter-actions.component.html */ "./src/app/admin/admin-filter-actions/admin-filter-actions.component.html"),
            styles: [__webpack_require__(/*! ./admin-filter-actions.component.css */ "./src/app/admin/admin-filter-actions/admin-filter-actions.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AdminFilterActionsComponent);
    return AdminFilterActionsComponent;
}());



/***/ }),

/***/ "./src/app/admin/admin-panel/admin-panel.component.css":
/*!*************************************************************!*\
  !*** ./src/app/admin/admin-panel/admin-panel.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/admin-panel/admin-panel.component.html":
/*!**************************************************************!*\
  !*** ./src/app/admin/admin-panel/admin-panel.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n  <h2>Panneau d'administration</h2>\n  <div class=\"tab-panel\" *ngIf=\"!creationMode\">\n    <app-admin-filter-actions *ngIf=\"!isPhotosManagementSelected\" [departmentList]=\"departmentList\" [userStatusList]=\"userStatusList\"\n      (loadDataEvent)=\"handleLoadUsers($event)\" (creationModeEvent)=\"handleCreationMode($event)\"></app-admin-filter-actions>\n    <br />\n    <tabset class=\"member-tabset\" (click)=\"onSelect($event)\" #adminTabs>\n      <tab heading=\"Gestion des utilisateurs\" *appHasRole=\"['Admin', 'HR']\">\n        <div class=\"row\">\n          <app-collaborator-list [users]=\"users\" (loadUsersEvent)=\"handleLoadUsers($event)\"></app-collaborator-list>\n        </div>\n      </tab>\n\n      <tab heading=\"Gestion des roles\" *appHasRole=\"['Admin', 'HR']\">\n        <div class=\"container\">\n          <app-user-roles-management [users]=\"users\" (loadUsersWithRolesEvent)=\"handleLoadUsers($event)\" (editUserRoleEvent)=\"handleEditUserRoles($event)\"></app-user-roles-management>\n        </div>\n      </tab>\n\n      <tab heading=\"Gestion de photos\" *appHasRole=\"['Admin', 'HR']\">\n        <app-photo-management></app-photo-management>\n      </tab>\n    </tabset>\n\n    <div class=\"d-flex justify-content-center\" *ngIf=\"!isPhotosManagementSelected\">\n      <pagination [boundaryLinks]=\"true\" [totalItems]=\"pagination.totalItems\" [itemsPerPage]=\"pagination.itemsPerPage\" [(ngModel)]=\"pagination.currentPage\"\n        previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\" (pageChanged)=\"pageChanged($event)\">\n      </pagination>\n    </div>\n  </div>\n\n  <div *ngIf=\"creationMode\" class=\"container\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-4\">\n        <app-collaborator-new [departmentList]=\"departmentList\" [userStatusList]=\"userStatusList\" (cancelRegister)=\"cancelRegisterMode($event)\"\n          (switchOffRegister)=\"switchOffRegisterMode($event)\"></app-collaborator-new>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/admin-panel/admin-panel.component.ts":
/*!************************************************************!*\
  !*** ./src/app/admin/admin-panel/admin-panel.component.ts ***!
  \************************************************************/
/*! exports provided: AdminPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminPanelComponent", function() { return AdminPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminPanelComponent = /** @class */ (function () {
    function AdminPanelComponent(route, adminService, alertify) {
        this.route = route;
        this.adminService = adminService;
        this.alertify = alertify;
        this.loading = false;
        this.creationMode = false;
        this.filters = {};
    }
    AdminPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            var resolvedData = data['resolvedData'];
            _this.users = resolvedData['users'].result;
            _this.departmentList = resolvedData['departmentList'];
            _this.userStatusList = resolvedData['userStatusList'];
            _this.pagination = resolvedData['users'].pagination;
        });
    };
    AdminPanelComponent.prototype.handleLoadUsers = function (filters) {
        var _this = this;
        this.loading = true;
        this.filters = filters;
        this.adminService
            .getUsersWithRoles(this.pagination.currentPage, this.pagination.itemsPerPage, this.filters)
            .subscribe(function (res) {
            _this.users = res.result;
            _this.pagination = res.pagination;
            _this.loading = false;
        }, function (error) {
            _this.alertify.error(error);
            _this.loading = false;
        });
    };
    AdminPanelComponent.prototype.handleEditUserRoles = function (event) {
        var _this = this;
        this.loading = true;
        this.adminService.updateUserRoles(event.user, event.rolesToUpdate).subscribe(function () {
            _this.alertify.success('Les rôles ont été mis à jour.');
            _this.handleLoadUsers(event.filters);
            _this.loading = false;
        }, function (error) {
            _this.alertify.error(error);
            _this.loading = false;
        });
    };
    AdminPanelComponent.prototype.pageChanged = function (event) {
        this.pagination.currentPage = event.page;
        this.handleLoadUsers(this.filters);
    };
    AdminPanelComponent.prototype.cancelRegisterMode = function (creationMode) {
        this.creationMode = creationMode;
    };
    AdminPanelComponent.prototype.switchOffRegisterMode = function (reload) {
        this.creationMode = false;
        if (reload) {
            this.handleLoadUsers(this.filters);
        }
    };
    AdminPanelComponent.prototype.handleCreationMode = function (event) {
        this.creationMode = event;
    };
    AdminPanelComponent.prototype.onSelect = function ($event) {
        if (this.adminTabs.tabs[2].active) {
            this.isPhotosManagementSelected = true;
        }
        else {
            this.isPhotosManagementSelected = false;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('adminTabs'),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["TabsetComponent"])
    ], AdminPanelComponent.prototype, "adminTabs", void 0);
    AdminPanelComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-panel',
            template: __webpack_require__(/*! ./admin-panel.component.html */ "./src/app/admin/admin-panel/admin-panel.component.html"),
            styles: [__webpack_require__(/*! ./admin-panel.component.css */ "./src/app/admin/admin-panel/admin-panel.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"]])
    ], AdminPanelComponent);
    return AdminPanelComponent;
}());



/***/ }),

/***/ "./src/app/admin/photo-management/photo-management.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/admin/photo-management/photo-management.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img.img-thumbnail {\n  height: 150;\n  min-width: 150 !important;\n  margin-bottom: 2px;\n}\n"

/***/ }),

/***/ "./src/app/admin/photo-management/photo-management.component.html":
/*!************************************************************************!*\
  !*** ./src/app/admin/photo-management/photo-management.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"alert alert-info mt-3\" role=\"alert\" *ngIf=\"photos?.length === 0\">\n    <p>Aucune photo d'utilisateur n'a encore été soumise pour approbation.</p>\n  </div>\n  <div class=\"col-sm-2\" *ngFor=\"let photo of photos\">\n    <h4>{{photo.userName}}</h4>\n    <img src=\"{{photo.url}}\" alt=\"photo.userName\" class=\"img-thumbnail p-1\">\n\n    <div class=\"text-center\">\n      <button type=\"button\" class=\"btn btn-sm btn-success mr-1\" (click)=\"approvePhoto(photo.id)\">Approve</button>\n      <button type=\"button\" class=\"btn btn-sm btn-danger\" (click)=\"rejectPhoto(photo.id)\">Reject</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/photo-management/photo-management.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/admin/photo-management/photo-management.component.ts ***!
  \**********************************************************************/
/*! exports provided: PhotoManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoManagementComponent", function() { return PhotoManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PhotoManagementComponent = /** @class */ (function () {
    function PhotoManagementComponent(adminService, alertify) {
        this.adminService = adminService;
        this.alertify = alertify;
        this.loading = false;
    }
    PhotoManagementComponent.prototype.ngOnInit = function () {
        this.getPhotosForApproval();
    };
    PhotoManagementComponent.prototype.getPhotosForApproval = function () {
        var _this = this;
        this.loading = true;
        this.adminService.getPhotosForApproval().subscribe(function (photos) {
            _this.photos = photos;
            _this.loading = false;
        }, function (error) {
            _this.alertify.error(error);
            _this.loading = false;
        });
    };
    PhotoManagementComponent.prototype.approvePhoto = function (photoId) {
        var _this = this;
        this.loading = true;
        this.adminService.approvePhoto(photoId).subscribe(function () {
            _this.photos.splice(_this.photos.findIndex(function (p) { return p.id === photoId; }), 1);
            _this.loading = false;
        }, function (error) {
            _this.alertify.error(error);
            _this.loading = false;
        });
    };
    PhotoManagementComponent.prototype.rejectPhoto = function (photoId) {
        var _this = this;
        this.loading = true;
        this.adminService.rejectPhoto(photoId).subscribe(function () {
            _this.photos.splice(_this.photos.findIndex(function (p) { return p.id === photoId; }), 1);
            _this.loading = false;
        }, function (error) {
            _this.alertify.error(error);
            _this.loading = false;
        });
    };
    PhotoManagementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-photo-management',
            template: __webpack_require__(/*! ./photo-management.component.html */ "./src/app/admin/photo-management/photo-management.component.html"),
            styles: [__webpack_require__(/*! ./photo-management.component.css */ "./src/app/admin/photo-management/photo-management.component.css")]
        }),
        __metadata("design:paramtypes", [_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"]])
    ], PhotoManagementComponent);
    return PhotoManagementComponent;
}());



/***/ }),

/***/ "./src/app/admin/roles-modal/roles-modal.component.css":
/*!*************************************************************!*\
  !*** ./src/app/admin/roles-modal/roles-modal.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/roles-modal/roles-modal.component.html":
/*!**************************************************************!*\
  !*** ./src/app/admin/roles-modal/roles-modal.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title pull-left\">Modifier les rôles pour {{user.firstName}} {{user.lastName}}</h4>\n  <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form #rolesForm=\"ngForm\" id=\"rolesForm\">\n    <div class=\"form-check\" *ngFor=\"let role of roles\">\n      <input name=\"role\" type=\"checkbox\" class=\"form-check-input\" value=\"{{role.name}}\" [checked]=\"role.checked\" (change)=\"role.checked = !role.checked\"\n        [disabled]=\"role.name === 'Admin' && user.userName === 'admin'\">\n      <label>{{role.name}}</label>\n    </div>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"bsModalRef.hide()\">Annuler</button>\n  <button type=\"button\" class=\"btn btn-success\" (click)=\"updateRoles()\" form=\"rolesForm\">Mettre à jour</button>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/roles-modal/roles-modal.component.ts":
/*!************************************************************!*\
  !*** ./src/app/admin/roles-modal/roles-modal.component.ts ***!
  \************************************************************/
/*! exports provided: RolesModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesModalComponent", function() { return RolesModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RolesModalComponent = /** @class */ (function () {
    function RolesModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.updateSelectedRoles = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    RolesModalComponent.prototype.ngOnInit = function () {
    };
    RolesModalComponent.prototype.updateRoles = function () {
        this.updateSelectedRoles.emit(this.roles);
        this.bsModalRef.hide();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RolesModalComponent.prototype, "updateSelectedRoles", void 0);
    RolesModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-roles-modal',
            template: __webpack_require__(/*! ./roles-modal.component.html */ "./src/app/admin/roles-modal/roles-modal.component.html"),
            styles: [__webpack_require__(/*! ./roles-modal.component.css */ "./src/app/admin/roles-modal/roles-modal.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"]])
    ], RolesModalComponent);
    return RolesModalComponent;
}());



/***/ }),

/***/ "./src/app/admin/user-roles-management/user-roles-management.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/admin/user-roles-management/user-roles-management.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/user-roles-management/user-roles-management.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/user-roles-management/user-roles-management.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-3\">\n  <div>\n    <div class=\"row\">\n      <table class=\"table table-hover\" style=\"cursor: pointer\">\n        <tr>\n          <th style=\"width: 25%\">Nom Complet</th>\n          <th style=\"width: 30%\">Email</th>\n          <th style=\"width: 30%\">Active roles</th>\n          <th style=\"width: 15%\"></th>\n        </tr>\n\n        <tr *ngFor=\"let user of users\" [routerLink]=\"['/admin/collaborators/', user.id]\">\n          <td>{{user.firstName}} {{user.lastName}}</td>\n          <td>{{user.email}}</td>\n          <td>{{user.roles}}</td>\n          <td>\n            <button class=\"btn btn-info\" (click)=\"$event.stopPropagation()\" (click)=\"editRolesModal(user)\">Edit Roles</button>\n          </td>\n        </tr>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/user-roles-management/user-roles-management.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/admin/user-roles-management/user-roles-management.component.ts ***!
  \********************************************************************************/
/*! exports provided: UserRolesManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRolesManagementComponent", function() { return UserRolesManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../roles-modal/roles-modal.component */ "./src/app/admin/roles-modal/roles-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserRolesManagementComponent = /** @class */ (function () {
    function UserRolesManagementComponent(modalService) {
        this.modalService = modalService;
        this.loadUsersWithRolesEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.editUserRoleEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    UserRolesManagementComponent.prototype.ngOnInit = function () { };
    UserRolesManagementComponent.prototype.handleLoadUsers = function (event) {
        this.loadUsersWithRolesEvent.emit(event);
    };
    UserRolesManagementComponent.prototype.editRolesModal = function (user) {
        var _this = this;
        var initialState = {
            user: user,
            roles: this.getRolesArray(user)
        };
        this.bsModalRef = this.modalService.show(_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_2__["RolesModalComponent"], { initialState: initialState });
        this.bsModalRef.content.updateSelectedRoles.subscribe(function (values) {
            var rolesToUpdate = {
                roleNames: values.filter(function (el) { return el.checked === true; }).map(function (el) { return el.name; }).slice()
            };
            if (rolesToUpdate) {
                var updateParams = { user: user, rolesToUpdate: rolesToUpdate };
                _this.editUserRoleEvent.emit(updateParams);
            }
        });
    };
    UserRolesManagementComponent.prototype.getRolesArray = function (user) {
        var roles = [];
        var userRoles = user.roles;
        var availableRoles = [
            { name: 'Admin', value: 'Admin' },
            { name: 'HR', value: 'HR', },
            { name: 'Collaborator', value: 'Collaborator' },
            { name: 'HRD', value: 'HRD' }
        ];
        for (var i = 0; i < availableRoles.length; i++) {
            var isMatch = false;
            for (var j = 0; j < userRoles.length; j++) {
                if (availableRoles[i].name === userRoles[j]) {
                    isMatch = true;
                    availableRoles[i].checked = true;
                    roles.push(availableRoles[i]);
                    break;
                }
            }
            if (!isMatch) {
                availableRoles[i].checked = false;
                roles.push(availableRoles[i]);
            }
        }
        return roles;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], UserRolesManagementComponent.prototype, "users", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], UserRolesManagementComponent.prototype, "loadUsersWithRolesEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], UserRolesManagementComponent.prototype, "editUserRoleEvent", void 0);
    UserRolesManagementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-roles-management',
            template: __webpack_require__(/*! ./user-roles-management.component.html */ "./src/app/admin/user-roles-management/user-roles-management.component.html"),
            styles: [__webpack_require__(/*! ./user-roles-management.component.css */ "./src/app/admin/user-roles-management/user-roles-management.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalService"]])
    ], UserRolesManagementComponent);
    return UserRolesManagementComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav></app-nav>\n<ngx-loading [show]=\"isSpinnerVisibile$ | async\"></ngx-loading>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_layout_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_services/layout.service */ "./src/app/_services/layout.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(authService, layoutService) {
        this.authService = authService;
        this.layoutService = layoutService;
        this.jwtHelper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_0__["JwtHelperService"]();
        this.isSpinnerVisibile$ = this.layoutService.isNavigationPending$;
    }
    AppComponent.prototype.ngOnInit = function () {
        var token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user'));
        if (token) {
            this.authService.decodedToken = this.jwtHelper.decodeToken(token);
        }
        if (user) {
            this.authService.currentUser = user;
            this.authService.changeMemberPhoto(user.photoUrl);
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _services_layout_service__WEBPACK_IMPORTED_MODULE_3__["LayoutService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: tokenGetter, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenGetter", function() { return tokenGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-gallery */ "./node_modules/ngx-gallery/bundles/ngx-gallery.umd.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ngx_gallery__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var time_ago_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! time-ago-pipe */ "./node_modules/time-ago-pipe/esm5/time-ago-pipe.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nav/nav.component */ "./src/app/nav/nav.component.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _services_error_interceptor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./_services/error.interceptor */ "./src/app/_services/error.interceptor.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _collaborators_collaborator_list_collaborator_list_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./collaborators/collaborator-list/collaborator-list.component */ "./src/app/collaborators/collaborator-list/collaborator-list.component.ts");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./messages/messages.component */ "./src/app/messages/messages.component.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./routes */ "./src/app/routes.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _collaborators_collaborator_card_collaborator_card_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./collaborators/collaborator-card/collaborator-card.component */ "./src/app/collaborators/collaborator-card/collaborator-card.component.ts");
/* harmony import */ var _collaborators_collaborator_detail_collaborator_detail_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./collaborators/collaborator-detail/collaborator-detail.component */ "./src/app/collaborators/collaborator-detail/collaborator-detail.component.ts");
/* harmony import */ var _collaborators_collaborator_edit_collaborator_edit_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./collaborators/collaborator-edit/collaborator-edit.component */ "./src/app/collaborators/collaborator-edit/collaborator-edit.component.ts");
/* harmony import */ var _resolvers_collaborator_list_resolver__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./_resolvers/collaborator-list.resolver */ "./src/app/_resolvers/collaborator-list.resolver.ts");
/* harmony import */ var _resolvers_collaborator_detail_resolver___WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./_resolvers/collaborator-detail.resolver. */ "./src/app/_resolvers/collaborator-detail.resolver..ts");
/* harmony import */ var _collaborators_collaborator_new_collaborator_new_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./collaborators/collaborator-new/collaborator-new.component */ "./src/app/collaborators/collaborator-new/collaborator-new.component.ts");
/* harmony import */ var _guards_prevent_unsave_changes_guards__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./_guards/prevent-unsave-changes-guards */ "./src/app/_guards/prevent-unsave-changes-guards.ts");
/* harmony import */ var _collaborators_photo_editor_photo_editor_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./collaborators/photo-editor/photo-editor.component */ "./src/app/collaborators/photo-editor/photo-editor.component.ts");
/* harmony import */ var _resolvers_messages_resolver__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./_resolvers/messages.resolver */ "./src/app/_resolvers/messages.resolver.ts");
/* harmony import */ var _collaborators_collaborator_messages_collaborator_messages_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./collaborators/collaborator-messages/collaborator-messages.component */ "./src/app/collaborators/collaborator-messages/collaborator-messages.component.ts");
/* harmony import */ var _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./admin/admin-panel/admin-panel.component */ "./src/app/admin/admin-panel/admin-panel.component.ts");
/* harmony import */ var _directives_hasRole_directive__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./_directives/hasRole.directive */ "./src/app/_directives/hasRole.directive.ts");
/* harmony import */ var _admin_user_roles_management_user_roles_management_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./admin/user-roles-management/user-roles-management.component */ "./src/app/admin/user-roles-management/user-roles-management.component.ts");
/* harmony import */ var _admin_photo_management_photo_management_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./admin/photo-management/photo-management.component */ "./src/app/admin/photo-management/photo-management.component.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var _admin_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./admin/roles-modal/roles-modal.component */ "./src/app/admin/roles-modal/roles-modal.component.ts");
/* harmony import */ var _hr_hr_panel_hr_panel_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./hr/hr-panel/hr-panel.component */ "./src/app/hr/hr-panel/hr-panel.component.ts");
/* harmony import */ var _strategies_strategies_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./strategies/strategies.component */ "./src/app/strategies/strategies.component.ts");
/* harmony import */ var _resolvers_strategies_resolver__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./_resolvers/strategies.resolver */ "./src/app/_resolvers/strategies.resolver.ts");
/* harmony import */ var _hr_strategies_strategy_list_strategy_list_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./hr/strategies/strategy-list/strategy-list.component */ "./src/app/hr/strategies/strategy-list/strategy-list.component.ts");
/* harmony import */ var _resolvers_strategy_list_resolver__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./_resolvers/strategy-list.resolver */ "./src/app/_resolvers/strategy-list.resolver.ts");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _hr_strategies_strategy_new_strategy_new_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./hr/strategies/strategy-new/strategy-new.component */ "./src/app/hr/strategies/strategy-new/strategy-new.component.ts");
/* harmony import */ var _hr_strategies_strategy_detail_strategy_detail_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./hr/strategies/strategy-detail/strategy-detail.component */ "./src/app/hr/strategies/strategy-detail/strategy-detail.component.ts");
/* harmony import */ var _hr_strategies_strategy_edit_modal_strategy_edit_modal_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./hr/strategies/strategy-edit-modal/strategy-edit-modal.component */ "./src/app/hr/strategies/strategy-edit-modal/strategy-edit-modal.component.ts");
/* harmony import */ var _hr_strategies_strategy_axis_strategy_axis_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./hr/strategies/strategy-axis/strategy-axis.component */ "./src/app/hr/strategies/strategy-axis/strategy-axis.component.ts");
/* harmony import */ var _resolvers_strategy_detail_resolver__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./_resolvers/strategy-detail.resolver */ "./src/app/_resolvers/strategy-detail.resolver.ts");
/* harmony import */ var _collaborators_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./collaborators/reset-password/reset-password.component */ "./src/app/collaborators/reset-password/reset-password.component.ts");
/* harmony import */ var _collaborators_forget_password_forget_password_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./collaborators/forget-password/forget-password.component */ "./src/app/collaborators/forget-password/forget-password.component.ts");
/* harmony import */ var _resolvers_profile_edit_resolver__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./_resolvers/profile-edit.resolver */ "./src/app/_resolvers/profile-edit.resolver.ts");
/* harmony import */ var _hr_strategies_axis_modal_axis_modal_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./hr/strategies/axis-modal/axis-modal.component */ "./src/app/hr/strategies/axis-modal/axis-modal.component.ts");
/* harmony import */ var _hr_strategies_axis_poles_weights_card_axis_poles_weights_card_component__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component */ "./src/app/hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component.ts");
/* harmony import */ var _hr_strategies_axis_pole_weight_item_axis_pole_weight_item_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component */ "./src/app/hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component.ts");
/* harmony import */ var _hr_strategies_axis_poles_weights_list_axis_poles_weights_list_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component */ "./src/app/hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component.ts");
/* harmony import */ var _collaborators_profile_edit_profile_edit_component__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./collaborators/profile-edit/profile-edit.component */ "./src/app/collaborators/profile-edit/profile-edit.component.ts");
/* harmony import */ var _hr_strategies_strategy_documentation_strategy_documentation_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./hr/strategies/strategy-documentation/strategy-documentation.component */ "./src/app/hr/strategies/strategy-documentation/strategy-documentation.component.ts");
/* harmony import */ var _collaborators_collaborator_search_collaborator_search_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./collaborators/collaborator-search/collaborator-search.component */ "./src/app/collaborators/collaborator-search/collaborator-search.component.ts");
/* harmony import */ var _hr_behavioral_skills_behavioral_skill_new_behavioral_skill_new_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./hr/behavioral-skills/behavioral-skill-new/behavioral-skill-new.component */ "./src/app/hr/behavioral-skills/behavioral-skill-new/behavioral-skill-new.component.ts");
/* harmony import */ var _hr_behavioral_skills_behavioral_skill_detail_behavioral_skill_detail_component__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component */ "./src/app/hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component.ts");
/* harmony import */ var _hr_behavioral_skills_behavioral_skill_list_behavioral_skill_list_component__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./hr/behavioral-skills/behavioral-skill-list/behavioral-skill-list.component */ "./src/app/hr/behavioral-skills/behavioral-skill-list/behavioral-skill-list.component.ts");
/* harmony import */ var _hr_behavioral_skills_behavioral_skill_edit_modal_behavioral_skill_edit_modal_component__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component */ "./src/app/hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component.ts");
/* harmony import */ var _resolvers_behavioral_skill_detail_resolver___WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./_resolvers/behavioral-skill-detail.resolver. */ "./src/app/_resolvers/behavioral-skill-detail.resolver..ts");
/* harmony import */ var _collaborators_evaluator_evaluator_component__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./collaborators/evaluator/evaluator.component */ "./src/app/collaborators/evaluator/evaluator.component.ts");
/* harmony import */ var _hr_evaluations_evaluation_hr_list_evaluation_hr_list_component__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./hr/evaluations/evaluation-hr-list/evaluation-hr-list.component */ "./src/app/hr/evaluations/evaluation-hr-list/evaluation-hr-list.component.ts");
/* harmony import */ var _hr_evaluations_evaluation_hr_edit_modal_evaluation_hr_edit_modal_component__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component */ "./src/app/hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component.ts");
/* harmony import */ var _hr_evaluations_evaluation_hr_new_evaluation_hr_new_component__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./hr/evaluations/evaluation-hr-new/evaluation-hr-new.component */ "./src/app/hr/evaluations/evaluation-hr-new/evaluation-hr-new.component.ts");
/* harmony import */ var _hr_evaluations_evaluation_hr_detail_evaluation_hr_detail_component__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component */ "./src/app/hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component.ts");
/* harmony import */ var _hr_hr_filter_create_actions_hr_filter_create_actions_component__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./hr/hr-filter-create-actions/hr-filter-create-actions.component */ "./src/app/hr/hr-filter-create-actions/hr-filter-create-actions.component.ts");
/* harmony import */ var _admin_admin_filter_actions_admin_filter_actions_component__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./admin/admin-filter-actions/admin-filter-actions.component */ "./src/app/admin/admin-filter-actions/admin-filter-actions.component.ts");
/* harmony import */ var _services_layout_service__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./_services/layout.service */ "./src/app/_services/layout.service.ts");
/* harmony import */ var _resolvers_evaluation_hr_detail_resolver__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./_resolvers/evaluation-hr-detail.resolver */ "./src/app/_resolvers/evaluation-hr-detail.resolver.ts");
/* harmony import */ var _hr_evaluations_evaluation_file_instance_hr_list_evaluation_file_instance_hr_list_component__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./hr/evaluations/evaluation-file-instance-hr-list/evaluation-file-instance-hr-list.component */ "./src/app/hr/evaluations/evaluation-file-instance-hr-list/evaluation-file-instance-hr-list.component.ts");
/* harmony import */ var _collaborators_evaluator_assignment_evaluator_assignment_component__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./collaborators/evaluator-assignment/evaluator-assignment.component */ "./src/app/collaborators/evaluator-assignment/evaluator-assignment.component.ts");
/* harmony import */ var _hr_evaluations_evaluation_file_instance_hr_new_evaluation_file_instance_hr_new_component__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./hr/evaluations/evaluation-file-instance-hr-new/evaluation-file-instance-hr-new.component */ "./src/app/hr/evaluations/evaluation-file-instance-hr-new/evaluation-file-instance-hr-new.component.ts");
/* harmony import */ var _sheets_sheets_panel_sheets_panel_component__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./sheets/sheets-panel/sheets-panel.component */ "./src/app/sheets/sheets-panel/sheets-panel.component.ts");
/* harmony import */ var _resolvers_sheets_resolver__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./_resolvers/sheets.resolver */ "./src/app/_resolvers/sheets.resolver.ts");
/* harmony import */ var _sheets_sheet_detail_sheet_detail_component__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./sheets/sheet-detail/sheet-detail.component */ "./src/app/sheets/sheet-detail/sheet-detail.component.ts");
/* harmony import */ var _resolvers_sheet_detail_resolver__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./_resolvers/sheet-detail.resolver */ "./src/app/_resolvers/sheet-detail.resolver.ts");
/* harmony import */ var _sheets_goals_goals_component__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./sheets/goals/goals.component */ "./src/app/sheets/goals/goals.component.ts");
/* harmony import */ var _sheets_goal_edit_modal_goal_edit_modal_component__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./sheets/goal-edit-modal/goal-edit-modal.component */ "./src/app/sheets/goal-edit-modal/goal-edit-modal.component.ts");
/* harmony import */ var _sheets_axis_user_axis_user_component__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./sheets/axis-user/axis-user.component */ "./src/app/sheets/axis-user/axis-user.component.ts");
/* harmony import */ var _sheets_goal_new_goal_new_component__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./sheets/goal-new/goal-new.component */ "./src/app/sheets/goal-new/goal-new.component.ts");
/* harmony import */ var _sheets_goal_card_goal_card_component__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./sheets/goal-card/goal-card.component */ "./src/app/sheets/goal-card/goal-card.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















































































function tokenGetter() {
    return localStorage.getItem('token');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"],
                _nav_nav_component__WEBPACK_IMPORTED_MODULE_13__["NavComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_15__["HomeComponent"],
                _collaborators_collaborator_list_collaborator_list_component__WEBPACK_IMPORTED_MODULE_18__["CollaboratorListComponent"],
                _messages_messages_component__WEBPACK_IMPORTED_MODULE_19__["MessagesComponent"],
                _collaborators_collaborator_card_collaborator_card_component__WEBPACK_IMPORTED_MODULE_23__["CollaboratorCardComponent"],
                _collaborators_collaborator_detail_collaborator_detail_component__WEBPACK_IMPORTED_MODULE_24__["CollaboratorDetailComponent"],
                _collaborators_collaborator_edit_collaborator_edit_component__WEBPACK_IMPORTED_MODULE_25__["CollaboratorEditComponent"],
                _collaborators_collaborator_new_collaborator_new_component__WEBPACK_IMPORTED_MODULE_28__["CollaboratorNewComponent"],
                _collaborators_collaborator_messages_collaborator_messages_component__WEBPACK_IMPORTED_MODULE_32__["CollaboratorMessagesComponent"],
                _collaborators_collaborator_search_collaborator_search_component__WEBPACK_IMPORTED_MODULE_59__["CollaboratorSearchComponent"],
                _collaborators_evaluator_evaluator_component__WEBPACK_IMPORTED_MODULE_65__["EvaluatorComponent"],
                _collaborators_profile_edit_profile_edit_component__WEBPACK_IMPORTED_MODULE_57__["ProfileEditComponent"],
                _collaborators_photo_editor_photo_editor_component__WEBPACK_IMPORTED_MODULE_30__["PhotoEditorComponent"],
                time_ago_pipe__WEBPACK_IMPORTED_MODULE_10__["TimeAgoPipe"],
                _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_33__["AdminPanelComponent"],
                _directives_hasRole_directive__WEBPACK_IMPORTED_MODULE_34__["HasRoleDirective"],
                _admin_user_roles_management_user_roles_management_component__WEBPACK_IMPORTED_MODULE_35__["UserRolesManagementComponent"],
                _admin_photo_management_photo_management_component__WEBPACK_IMPORTED_MODULE_36__["PhotoManagementComponent"],
                _admin_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_38__["RolesModalComponent"],
                _messages_messages_component__WEBPACK_IMPORTED_MODULE_19__["MessagesComponent"],
                _nav_nav_component__WEBPACK_IMPORTED_MODULE_13__["NavComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_15__["HomeComponent"],
                _hr_hr_panel_hr_panel_component__WEBPACK_IMPORTED_MODULE_39__["HrPanelComponent"],
                _strategies_strategies_component__WEBPACK_IMPORTED_MODULE_40__["StrategiesComponent"],
                _hr_strategies_strategy_list_strategy_list_component__WEBPACK_IMPORTED_MODULE_42__["StrategyListComponent"],
                _hr_strategies_strategy_new_strategy_new_component__WEBPACK_IMPORTED_MODULE_45__["StrategyNewComponent"],
                _hr_strategies_strategy_edit_modal_strategy_edit_modal_component__WEBPACK_IMPORTED_MODULE_47__["StrategyEditModalComponent"],
                _hr_strategies_strategy_detail_strategy_detail_component__WEBPACK_IMPORTED_MODULE_46__["StrategyDetailComponent"],
                _hr_strategies_strategy_axis_strategy_axis_component__WEBPACK_IMPORTED_MODULE_48__["StrategyAxisComponent"],
                _hr_strategies_strategy_documentation_strategy_documentation_component__WEBPACK_IMPORTED_MODULE_58__["StrategyDocumentationComponent"],
                _hr_strategies_axis_modal_axis_modal_component__WEBPACK_IMPORTED_MODULE_53__["AxisModalComponent"],
                _hr_strategies_axis_poles_weights_card_axis_poles_weights_card_component__WEBPACK_IMPORTED_MODULE_54__["AxisPolesWeightsCardComponent"],
                _hr_strategies_axis_pole_weight_item_axis_pole_weight_item_component__WEBPACK_IMPORTED_MODULE_55__["AxisPoleWeightItemComponent"],
                _hr_strategies_axis_poles_weights_list_axis_poles_weights_list_component__WEBPACK_IMPORTED_MODULE_56__["AxisPolesWeightsListComponent"],
                _collaborators_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_50__["ResetPasswordComponent"],
                _collaborators_forget_password_forget_password_component__WEBPACK_IMPORTED_MODULE_51__["ForgetPasswordComponent"],
                _hr_behavioral_skills_behavioral_skill_list_behavioral_skill_list_component__WEBPACK_IMPORTED_MODULE_62__["BehavioralSkillListComponent"],
                _hr_behavioral_skills_behavioral_skill_detail_behavioral_skill_detail_component__WEBPACK_IMPORTED_MODULE_61__["BehavioralSkillDetailComponent"],
                _hr_behavioral_skills_behavioral_skill_new_behavioral_skill_new_component__WEBPACK_IMPORTED_MODULE_60__["BehavioralSkillNewComponent"],
                _hr_behavioral_skills_behavioral_skill_edit_modal_behavioral_skill_edit_modal_component__WEBPACK_IMPORTED_MODULE_63__["BehavioralSkillEditModalComponent"],
                _hr_evaluations_evaluation_hr_list_evaluation_hr_list_component__WEBPACK_IMPORTED_MODULE_66__["EvaluationHrListComponent"],
                _hr_evaluations_evaluation_hr_edit_modal_evaluation_hr_edit_modal_component__WEBPACK_IMPORTED_MODULE_67__["EvaluationHrEditModalComponent"],
                _hr_evaluations_evaluation_hr_new_evaluation_hr_new_component__WEBPACK_IMPORTED_MODULE_68__["EvaluationHrNewComponent"],
                _hr_evaluations_evaluation_hr_detail_evaluation_hr_detail_component__WEBPACK_IMPORTED_MODULE_69__["EvaluationHrDetailComponent"],
                _hr_hr_filter_create_actions_hr_filter_create_actions_component__WEBPACK_IMPORTED_MODULE_70__["HrFilterCreateActionsComponent"],
                _admin_admin_filter_actions_admin_filter_actions_component__WEBPACK_IMPORTED_MODULE_71__["AdminFilterActionsComponent"],
                _hr_evaluations_evaluation_file_instance_hr_list_evaluation_file_instance_hr_list_component__WEBPACK_IMPORTED_MODULE_74__["EvaluationFileInstanceHrListComponent"],
                _collaborators_evaluator_assignment_evaluator_assignment_component__WEBPACK_IMPORTED_MODULE_75__["EvaluatorAssignmentComponent"],
                _hr_evaluations_evaluation_file_instance_hr_new_evaluation_file_instance_hr_new_component__WEBPACK_IMPORTED_MODULE_76__["EvaluationFileInstanceHrNewComponent"],
                _sheets_sheets_panel_sheets_panel_component__WEBPACK_IMPORTED_MODULE_77__["SheetsPanelComponent"],
                _sheets_sheet_detail_sheet_detail_component__WEBPACK_IMPORTED_MODULE_79__["SheetDetailComponent"],
                _sheets_goals_goals_component__WEBPACK_IMPORTED_MODULE_81__["GoalsComponent"],
                _sheets_goal_edit_modal_goal_edit_modal_component__WEBPACK_IMPORTED_MODULE_82__["GoalEditModalComponent"],
                _sheets_axis_user_axis_user_component__WEBPACK_IMPORTED_MODULE_83__["AxisUserComponent"],
                _sheets_goal_new_goal_new_component__WEBPACK_IMPORTED_MODULE_84__["GoalNewComponent"],
                _sheets_goal_card_goal_card_component__WEBPACK_IMPORTED_MODULE_85__["GoalCardComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsDropdownModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsDatepickerModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["TabsModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ButtonsModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["CarouselModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["AccordionModule"].forRoot(),
                ngx_loading__WEBPACK_IMPORTED_MODULE_5__["NgxLoadingModule"].forRoot({}),
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forRoot(_routes__WEBPACK_IMPORTED_MODULE_20__["appRoutes"]),
                ngx_gallery__WEBPACK_IMPORTED_MODULE_8__["NgxGalleryModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ModalModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["PaginationModule"].forRoot(),
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__["FileUploadModule"],
                _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_7__["JwtModule"].forRoot({
                    config: {
                        tokenGetter: tokenGetter,
                        whitelistedDomains: ['localhost:5000'],
                        blacklistedRoutes: ['localhost:5000/api/auth']
                    }
                })
            ],
            providers: [
                _services_auth_service__WEBPACK_IMPORTED_MODULE_14__["AuthService"],
                _services_error_interceptor__WEBPACK_IMPORTED_MODULE_16__["ErrorInterceptorProvider"],
                _services_alertify_service__WEBPACK_IMPORTED_MODULE_17__["AlertifyService"],
                _guards_auth_guard__WEBPACK_IMPORTED_MODULE_21__["AuthGuard"],
                _guards_prevent_unsave_changes_guards__WEBPACK_IMPORTED_MODULE_29__["PreventUnsavedChanges"],
                _services_user_service__WEBPACK_IMPORTED_MODULE_22__["UserService"],
                _resolvers_collaborator_list_resolver__WEBPACK_IMPORTED_MODULE_26__["CollaboratorListResolver"],
                _resolvers_collaborator_detail_resolver___WEBPACK_IMPORTED_MODULE_27__["CollaboratorDetailResolver"],
                _resolvers_profile_edit_resolver__WEBPACK_IMPORTED_MODULE_52__["ProfileEditResolver"],
                _resolvers_messages_resolver__WEBPACK_IMPORTED_MODULE_31__["MessagesResolver"],
                _resolvers_strategies_resolver__WEBPACK_IMPORTED_MODULE_41__["StrategiesResolver"],
                _resolvers_strategy_list_resolver__WEBPACK_IMPORTED_MODULE_43__["StrategyListResolver"],
                _resolvers_strategy_detail_resolver__WEBPACK_IMPORTED_MODULE_49__["StrategyDetailResolver"],
                _resolvers_behavioral_skill_detail_resolver___WEBPACK_IMPORTED_MODULE_64__["BehavioralSkillDetailResolver"],
                _resolvers_evaluation_hr_detail_resolver__WEBPACK_IMPORTED_MODULE_73__["EvaluationHrDetailResolver"],
                _services_admin_service__WEBPACK_IMPORTED_MODULE_37__["AdminService"],
                _services_hr_service__WEBPACK_IMPORTED_MODULE_44__["HrService"],
                _services_layout_service__WEBPACK_IMPORTED_MODULE_72__["LayoutService"],
                _resolvers_sheets_resolver__WEBPACK_IMPORTED_MODULE_78__["SheetsResolver"],
                _resolvers_sheet_detail_resolver__WEBPACK_IMPORTED_MODULE_80__["SheetDetailResolver"]
            ],
            entryComponents: [
                _admin_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_38__["RolesModalComponent"],
                _hr_strategies_axis_modal_axis_modal_component__WEBPACK_IMPORTED_MODULE_53__["AxisModalComponent"],
                _hr_strategies_strategy_edit_modal_strategy_edit_modal_component__WEBPACK_IMPORTED_MODULE_47__["StrategyEditModalComponent"],
                _hr_behavioral_skills_behavioral_skill_edit_modal_behavioral_skill_edit_modal_component__WEBPACK_IMPORTED_MODULE_63__["BehavioralSkillEditModalComponent"],
                _hr_evaluations_evaluation_hr_edit_modal_evaluation_hr_edit_modal_component__WEBPACK_IMPORTED_MODULE_67__["EvaluationHrEditModalComponent"],
                _collaborators_collaborator_search_collaborator_search_component__WEBPACK_IMPORTED_MODULE_59__["CollaboratorSearchComponent"],
                _sheets_goal_edit_modal_goal_edit_modal_component__WEBPACK_IMPORTED_MODULE_82__["GoalEditModalComponent"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/collaborators/collaborator-card/collaborator-card.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-card/collaborator-card.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card:hover img {\n  -webkit-transform: scale(1.2, 1.2);\n          transform: scale(1.2, 1.2);\n  transition-duration: 500ms;\n  transition-timing-function: ease-out;\n  opacity: 0.7;\n}\n\n.card img {\n  -webkit-transform: scale(1, 1);\n          transform: scale(1, 1);\n  transition-duration: 500ms;\n  transition-timing-function: ease-out;\n}\n\n.card-img-wrapper {\n  overflow: hidden;\n  position: relative;\n}\n\n.member-icons {\n  position: absolute;\n  bottom: -30%;\n  left: 0;\n  right: 0;\n  margin-right: auto;\n  margin-left: auto;\n  opacity: 0;\n}\n\n.card-img-wrapper:hover .member-icons {\n  bottom: 0;\n  opacity: 1;\n}\n\n.animate {\n  transition: all 0.3 ease-in-out;\n}\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-card/collaborator-card.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-card/collaborator-card.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card mb-4\">\n  <div class=\"card-img-wrapper\">\n    <img class=\"card-img-top\" src=\"{{ user.photoUrl || '../../../assets/user.png' }}\" alt=\"{{ user.lastName }}\" />\n    <ul class=\"list-inline member-icons animate text-center\">\n      <li class=\"list-inline-item\">\n        <button class=\"btn btn-primary\" [routerLink]=\"['/admin/collaborators/', user.id]\">\n          <i class=\"fa fa-user\"></i>\n        </button>\n      </li>\n\n      <li class=\"list-inline-item\">\n        <button class=\"btn btn-primary\" [routerLink]=\"['/admin/collaborators/edit/', user.id]\">\n          <i class=\"fa fa-edit\"></i>\n        </button>\n      </li>\n\n      <li class=\"list-inline-item\">\n        <button class=\"btn btn-primary\" [routerLink]=\"['/admin/collaborators/', user.id]\" [queryParams]=\"{ tab: 3 }\">\n          <i class=\"fa fa-envelope\"></i>\n        </button>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"card-body p-1\">\n    <h6 class=\"card-title text-center mb-1\">\n      <i class=\"fa fa-user\"></i>{{ user.firstName }}, {{ user.lastName }}\n    </h6>\n    <p class=\"card-text text-muted text-center\">\n      {{ user.title }}\n    </p>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-card/collaborator-card.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-card/collaborator-card.component.ts ***!
  \********************************************************************************/
/*! exports provided: CollaboratorCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollaboratorCardComponent", function() { return CollaboratorCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CollaboratorCardComponent = /** @class */ (function () {
    function CollaboratorCardComponent() {
    }
    CollaboratorCardComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CollaboratorCardComponent.prototype, "user", void 0);
    CollaboratorCardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-collaborator-card',
            template: __webpack_require__(/*! ./collaborator-card.component.html */ "./src/app/collaborators/collaborator-card/collaborator-card.component.html"),
            styles: [__webpack_require__(/*! ./collaborator-card.component.css */ "./src/app/collaborators/collaborator-card/collaborator-card.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CollaboratorCardComponent);
    return CollaboratorCardComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/collaborator-detail/collaborator-detail.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-detail/collaborator-detail.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/collaborators/collaborator-detail/collaborator-detail.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-detail/collaborator-detail.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-4\">\n  <div class=\"row\">\n    <h1>Profile de {{ user.lastName }}</h1>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <img class=\"card-img-top img-thumbnail\" src=\"{{ user.photoUrl || '../../../assets/user.png' }}\" alt=\"{{ user.lastName }}\"\n        />\n        <div class=\"card-body\">\n          <div>\n            <strong>Derniere visite:</strong>\n            <p>{{ user.lastActive | timeAgo }}</p>\n          </div>\n          <div>\n            <strong>Date de Création:</strong>\n            <p>{{ user.created | date: 'mediumDate' }}</p>\n          </div>\n        </div>\n        <div class=\"card-footer\">\n          <div class=\"btn-group d-fles\">\n            <button class=\"btn btn-primary w-140 mr-2\" [routerLink]=\"['/admin']\">Retour au List</button>\n            <button class=\"btn btn-success w-60 mr-2\" (click)=\"selectTab(3)\">\n              Message\n            </button>\n            <button class=\"btn btn-secondary w-60\" [routerLink]=\"['/admin/collaborators/edit', user.id]\">Editer</button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-8\">\n      <div class=\"tab-panel\">\n        <tabset class=\"member-tabset\" #memberTabs>\n          <tab heading=\"À propos {{ user.firstName }}\">\n            <div class=\"row\">\n              <div class=\"col-lg-4\">\n                <h4>Nom Complet</h4>\n                <p>{{ user.firstName }} {{user.lastName}}</p>\n                <h4>Statut</h4>\n                <p>{{ user.userStatus.name }}</p>\n                <h4>Fonction</h4>\n                <p>{{ user.title }}</p>\n                <h4>Direction</h4>\n                <p>{{ user.department.name }}</p>\n              </div>\n              <div class=\"col-lg-6 offset-lg-1\">\n                <h4>Matricule</h4>\n                <p>{{ user.employeeNumber }}</p>\n                <h4>Email</h4>\n                <p>{{ user.email }}</p>\n                <h4>Date de recrutement</h4>\n                <p>{{ user.recruitmentDate | date: 'mediumDate'}}</p>\n\n              </div>\n            </div>\n          </tab>\n          <tab heading=\"Évaluateurs / Évalués\">\n            <app-evaluator-assignment [evaluated]=\"user\"></app-evaluator-assignment>\n          </tab>\n          <tab heading=\"Photos\">\n            <ngx-gallery [options]=\"galleryOptions\" [images]=\"galleryImages\"></ngx-gallery>\n          </tab>\n          <tab heading=\"Messages\">\n            <app-collaborator-messages [recipientId]=\"user.id\"></app-collaborator-messages>\n          </tab>\n        </tabset>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-detail/collaborator-detail.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-detail/collaborator-detail.component.ts ***!
  \************************************************************************************/
/*! exports provided: CollaboratorDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollaboratorDetailComponent", function() { return CollaboratorDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-gallery */ "./node_modules/ngx-gallery/bundles/ngx-gallery.umd.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ngx_gallery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CollaboratorDetailComponent = /** @class */ (function () {
    function CollaboratorDetailComponent(route) {
        this.route = route;
    }
    CollaboratorDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.user = data['user'];
        });
        this.route.queryParams.subscribe(function (params) {
            var selectedTab = params['tab'];
            _this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
        });
        this.galleryOptions = [
            {
                width: '500px',
                height: '500px',
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation: ngx_gallery__WEBPACK_IMPORTED_MODULE_2__["NgxGalleryAnimation"].Slide,
                preview: false
            }
        ];
        this.galleryImages = this.getImages();
    };
    CollaboratorDetailComponent.prototype.getImages = function () {
        var imagesUrls = [];
        for (var i = 0; i < this.user.photos.length; i++) {
            imagesUrls.push({
                small: this.user.photos[i].url,
                medium: this.user.photos[i].url,
                big: this.user.photos[i].url,
                description: this.user.photos[i].description
            });
        }
        return imagesUrls;
    };
    CollaboratorDetailComponent.prototype.selectTab = function (tabId) {
        this.memberTabs.tabs[tabId].active = true;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('memberTabs'),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_3__["TabsetComponent"])
    ], CollaboratorDetailComponent.prototype, "memberTabs", void 0);
    CollaboratorDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-collaborator-detail',
            template: __webpack_require__(/*! ./collaborator-detail.component.html */ "./src/app/collaborators/collaborator-detail/collaborator-detail.component.html"),
            styles: [__webpack_require__(/*! ./collaborator-detail.component.css */ "./src/app/collaborators/collaborator-detail/collaborator-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], CollaboratorDetailComponent);
    return CollaboratorDetailComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/collaborator-edit/collaborator-edit.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-edit/collaborator-edit.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".img-thumbnail {\n  margin: 25px;\n  width: 85%;\n  height: 85%;\n}\n\n.card-body {\n  padding: 0 25px;\n}\n\n.card-footer {\n  padding: 10px 15ps;\n  background-color: #fff;\n  border-top: none;\n}\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-edit/collaborator-edit.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-edit/collaborator-edit.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-4\">\n  <div class=\"row\">\n    <div class=\"col-sm-8 offset-sm-4\">\n      <div *ngIf=\"editForm.dirty\" class=\"alert alert-info\">\n        <p>\n          <strong>Information:</strong>\n          Vous avez apporté des modifications. Toute modification non enregistrée sera perdue!\n        </p>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <img class=\"card-img-top img-thumbnail\" src=\"{{ user.photoUrl || '../../../assets/user.png' }}\" alt=\"{{ user.lastName }}\"\n        />\n        <div class=\"card-body\">\n          <div>\n            <strong>Dernière visite:</strong>\n            <p>{{ user.lastActive | timeAgo }}</p>\n          </div>\n          <div>\n            <strong>Date de Création:</strong>\n            <p>{{ user.created | date: 'mediumDate' }}</p>\n          </div>\n        </div>\n        <div class=\"card-footer\">\n          <button class=\"btn btn-success w-80\" [disabled]=\"!editForm.dirty || editForm.invalid\" form=\"editForm\">\n            Sauvegarder\n          </button>\n          <button class=\"btn btn-primary w-60 ml-2\" [routerLink]=\"['/admin']\">Anuuler</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-8\">\n      <div class=\"tab-panel\">\n        <tabset class=\"member-tabset\">\n          <tab heading=\"Editer Profile\">\n            <form #editForm=\"ngForm\" id=\"editForm\" (ngSubmit)=\"updateUser()\" novalidate>\n              <div class=\"row\">\n                <div class=\"col-lg-4\">\n                  <h4>Prénom</h4>\n                  <input type=\"text\" name=\"firstName\" class=\"form-control\" [(ngModel)]=\"user.firstName\" #firstName=\"ngModel\" [ngClass]=\"{ 'is-invalid': firstName.invalid }\" required/>\n                  <div *ngIf=\"firstName.invalid && (firstName.dirty || firstName.touched)\" class=\"invalid-feedback\">\n                    <div *ngIf=\"firstName.errors.required\">Le prénom est requis.</div>\n                  </div>\n                  \n                  <h4>Nom</h4>\n                  <input type=\"text\" name=\"lastName\" class=\"form-control\" [(ngModel)]=\"user.lastName\" #lastName=\"ngModel\" [ngClass]=\"{ 'is-invalid': lastName.invalid }\" required/>\n                  <div *ngIf=\"lastName.invalid && (lastName.dirty || lastName.touched)\" class=\"invalid-feedback\">\n                    <div *ngIf=\"lastName.errors.required\">Le nom est requis.</div>\n                  </div>\n\n                  <h4>Statut</h4>\n                  <select class=\"form-control mb-1\" style=\"width: 200px\" id=\"userStatusId\" name=\"userStatusId\" [(ngModel)]=\"user.userStatus.id\" required>\n                    <option *ngFor=\"let us of userStatusList\" [ngValue]=\"us.id\">\n                      {{ us.name }}\n                    </option>\n                  </select>\n\n                  <h4>Fonction</h4>\n                  <input type=\"text\" name=\"title\" class=\"form-control\" [(ngModel)]=\"user.title\" #title=\"ngModel\" [ngClass]=\"{ 'is-invalid': title.invalid }\" required/>\n                  <div *ngIf=\"title.invalid && (title.dirty || title.touched)\" class=\"invalid-feedback\">\n                    <div *ngIf=\"title.errors.required\">La fonction est requise.</div>\n                  </div>\n\n                  <h4>Direction</h4>\n                  <select class=\"form-control mb-1\" style=\"width: 200px\" id=\"departmentId\" name=\"departmentId\" [(ngModel)]=\"user.department.id\"\n                    required>\n                    <option *ngFor=\"let dpt of departmentList\" [ngValue]=\"dpt.id\">\n                      {{ dpt.name }}\n                    </option>\n                  </select>\n                </div>\n\n                <div class=\"col-lg-6 offset-lg1\">\n                  <h4>Matricule</h4>\n                  <input type=\"text\" name=\"employeeNumber\" class=\"form-control\" [(ngModel)]=\"user.employeeNumber\" #employeeNumber=\"ngModel\" [ngClass]=\"{ 'is-invalid': employeeNumber.invalid }\" required/>\n                  <div *ngIf=\"employeeNumber.invalid && (employeeNumber.dirty || employeeNumber.touched)\" class=\"invalid-feedback\">\n                    <div *ngIf=\"employeeNumber.errors.required\">Le matricule est requis.</div>\n                  </div>\n\n                  <h4>Email</h4>\n                  <input type=\"text\" name=\"email\" class=\"form-control\" [(ngModel)]=\"user.email\" required #email=\"ngModel\" [ngClass]=\"{ 'is-invalid': email.invalid }\" required/>\n                  <div *ngIf=\"email.invalid && (email.dirty || email.touched)\" class=\"invalid-feedback\">\n                    <div *ngIf=\"email.errors.required\">L'email est requis.</div>\n                  </div>\n\n                  <h4>Date de recrutement</h4>\n                  <input type=\"text\" name=\"recruitmentDate\" class=\"form-control mb-1\" [(ngModel)]=\"user.recruitmentDate\" bsDatepicker [bsConfig]=\"bsConfig\" #recruitmentDate=\"ngModel\" [ngClass]=\"{ 'is-invalid': recruitmentDate.invalid }\" required/>\n                  <div *ngIf=\"recruitmentDate.invalid && (recruitmentDate.dirty || recruitmentDate.touched)\" class=\"invalid-feedback\">\n                    <div *ngIf=\"recruitmentDate.errors.required\">Le prénom est requis.</div>\n                  </div>\n                </div>\n              </div>\n            </form>\n          </tab>\n        </tabset>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-edit/collaborator-edit.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-edit/collaborator-edit.component.ts ***!
  \********************************************************************************/
/*! exports provided: CollaboratorEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollaboratorEditComponent", function() { return CollaboratorEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CollaboratorEditComponent = /** @class */ (function () {
    function CollaboratorEditComponent(route, alertify, adminService, authService) {
        this.route = route;
        this.alertify = alertify;
        this.adminService = adminService;
        this.authService = authService;
        this.bsValue = new Date();
        this.loading = false;
    }
    CollaboratorEditComponent.prototype.unloadNotification = function ($event) {
        if (this.editForm.dirty) {
            $event.returnValue = true;
        }
    };
    CollaboratorEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.departmentList = JSON.parse(localStorage.getItem('departmentList'));
        this.userStatusList = JSON.parse(localStorage.getItem('userStatusList'));
        this.bsConfig = {
            containerClass: 'theme-red',
            dateInputFormat: 'YYYY-MM-DD'
        };
        this.route.data.subscribe(function (data) {
            _this.user = data['user'];
        });
        this.bsValue = this.user.recruitmentDate;
    };
    CollaboratorEditComponent.prototype.updateUser = function () {
        var _this = this;
        this.loading = true;
        var updatedUser = {
            departmentId: this.user.department.id,
            userStatusId: this.user.userStatus.id,
            email: this.user.email,
            employeeNumber: this.user.employeeNumber,
            firstName: this.user.firstName,
            id: this.user.id,
            lastName: this.user.lastName,
            recruitmentDate: this.user.recruitmentDate,
            title: this.user.title
        };
        this.adminService
            .updateUser(updatedUser)
            .subscribe(function (next) {
            _this.loading = false;
            _this.alertify.success('Mise à jour du profil réussie');
            _this.editForm.reset(updatedUser);
        }, function (error) {
            _this.alertify.error(error);
            _this.loading = false;
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('editForm'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"])
    ], CollaboratorEditComponent.prototype, "editForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:beforeunload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], CollaboratorEditComponent.prototype, "unloadNotification", null);
    CollaboratorEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-collaborator-edit',
            template: __webpack_require__(/*! ./collaborator-edit.component.html */ "./src/app/collaborators/collaborator-edit/collaborator-edit.component.html"),
            styles: [__webpack_require__(/*! ./collaborator-edit.component.css */ "./src/app/collaborators/collaborator-edit/collaborator-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"],
            _services_admin_service__WEBPACK_IMPORTED_MODULE_4__["AdminService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]])
    ], CollaboratorEditComponent);
    return CollaboratorEditComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/collaborator-list/collaborator-list.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-list/collaborator-list.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/collaborators/collaborator-list/collaborator-list.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-list/collaborator-list.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-3\">\n  <div class=\"row\" style=\"width:50vw;\">\n    <div *ngFor=\"let user of users\" class=\"col-lg-3 col-md-6 col-sm-12\">\n      <app-collaborator-card [user]=\"user\"></app-collaborator-card>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-list/collaborator-list.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-list/collaborator-list.component.ts ***!
  \********************************************************************************/
/*! exports provided: CollaboratorListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollaboratorListComponent", function() { return CollaboratorListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CollaboratorListComponent = /** @class */ (function () {
    function CollaboratorListComponent() {
        this.loadUsersEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pageChangedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    CollaboratorListComponent.prototype.ngOnInit = function () { };
    CollaboratorListComponent.prototype.handleLoadUsers = function (event) {
        this.loadUsersEvent.emit(event);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], CollaboratorListComponent.prototype, "users", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CollaboratorListComponent.prototype, "loadUsersEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CollaboratorListComponent.prototype, "pageChangedEvent", void 0);
    CollaboratorListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-collaborator-list',
            template: __webpack_require__(/*! ./collaborator-list.component.html */ "./src/app/collaborators/collaborator-list/collaborator-list.component.html"),
            styles: [__webpack_require__(/*! ./collaborator-list.component.css */ "./src/app/collaborators/collaborator-list/collaborator-list.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CollaboratorListComponent);
    return CollaboratorListComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/collaborator-messages/collaborator-messages.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-messages/collaborator-messages.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n  border: none;\n}\n\n.chat {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.chat li {\n  margin-bottom: 10px;\n  padding-bottom: 10px;\n  border-bottom: 1px dotted #b3a9a9;\n}\n\n.rounded-circle {\n  height: 50px;\n  width: 50px;\n}\n\n.card-body {\n  overflow-y: scroll;\n  height: 400px;\n}\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-messages/collaborator-messages.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-messages/collaborator-messages.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-body\">\n    <div *ngIf=\"messages?.length === 0\">\n      <p>Pas encore de message...</p>\n    </div>\n    <ul class=\"chat\">\n      <li *ngFor=\"let message of messages\">\n        <!-- to them -->\n        <div *ngIf=\"message.senderId == recipientId\">\n          <span class=\"chat-img float-left\">\n            <img src=\"{{ message.senderPhotoUrl }}\" alt=\"{{ message.senderKnownAs }}\" class=\"rounded-circle\" />\n          </span>\n          <div class=\"chat-body\">\n            <div class=\"header\">\n              <strong class=\"primary-font\">{{ message.senderKnownAs }}</strong>\n              <small class=\"text-muted float-right\">\n                <span class=\"fa fa-clock-o\">{{ message.messageSent | timeAgo }}\n                </span>\n              </small>\n            </div>\n            <p>{{ message.content }}</p>\n          </div>\n        </div>\n        <!-- to me -->\n        <div *ngIf=\"message.senderId != recipientId\">\n          <span class=\"chat-img float-right\">\n            <img src=\"{{ message.senderPhotoUrl }}\" alt=\"{{ message.senderKnownAs }}\" class=\"rounded-circle\" />\n          </span>\n          <div class=\"chat-body\">\n            <div class=\"header\">\n              <small class=\"text-muted\">\n                <span class=\"fa fa-clock-o\">{{ message.messageSent | timeAgo }}\n                </span>\n                <span *ngIf=\"!message.isRead\" class=\"text-danger\">(Unread)</span>\n                <span *ngIf=\"message.isRead\" class=\"text-success\">(Read {{ message.dateRead | timeAgo }}</span>\n              </small>\n              <strong class=\"primary-font float-right\">{{ message.senderKnownAs }}\n              </strong>\n            </div>\n            <p>{{ message.content }}</p>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"card-footer\">\n    <form #messageForm=\"ngForm\" (ngSubmit)=\"messageForm.valid && sendMessage()\">\n      <div class=\"input-group\">\n        <input [(ngModel)]=\"newMessage.content\" name=\"content\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"envoyer un message privé\"\n        />\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-primary\" [disabled]=\"!messageForm.valid\">\n            Envoyer\n          </button>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-messages/collaborator-messages.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-messages/collaborator-messages.component.ts ***!
  \****************************************************************************************/
/*! exports provided: CollaboratorMessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollaboratorMessagesComponent", function() { return CollaboratorMessagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CollaboratorMessagesComponent = /** @class */ (function () {
    function CollaboratorMessagesComponent(userService, authService, alertify) {
        this.userService = userService;
        this.authService = authService;
        this.alertify = alertify;
        this.newMessage = {};
        this.loading = false;
    }
    CollaboratorMessagesComponent.prototype.ngOnInit = function () {
        this.loadMessages();
    };
    CollaboratorMessagesComponent.prototype.loadMessages = function () {
        var _this = this;
        this.loading = true;
        var currentUserId = +this.authService.decodedToken.nameid;
        this.userService
            .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (messages) {
            for (var i = 0; i < messages.length; i++) {
                if (messages[i].isRead === false &&
                    messages[i].recipientId === currentUserId) {
                    _this.userService.markAsRead(currentUserId, messages[i].id);
                }
            }
        }))
            .subscribe(function (messages) {
            _this.messages = messages;
            _this.loading = false;
        }, function (error) {
            _this.alertify.error(error);
            _this.loading = false;
        });
    };
    CollaboratorMessagesComponent.prototype.sendMessage = function () {
        var _this = this;
        this.loading = true;
        this.newMessage.recipientId = this.recipientId;
        this.userService
            .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
            .subscribe(function (message) {
            _this.messages.unshift(message);
            _this.newMessage.content = '';
            _this.loading = false;
        }, function (error) {
            _this.alertify.error(error);
            _this.loading = false;
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], CollaboratorMessagesComponent.prototype, "recipientId", void 0);
    CollaboratorMessagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-collaborator-messages',
            template: __webpack_require__(/*! ./collaborator-messages.component.html */ "./src/app/collaborators/collaborator-messages/collaborator-messages.component.html"),
            styles: [__webpack_require__(/*! ./collaborator-messages.component.css */ "./src/app/collaborators/collaborator-messages/collaborator-messages.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"]])
    ], CollaboratorMessagesComponent);
    return CollaboratorMessagesComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/collaborator-new/collaborator-new.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-new/collaborator-new.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group>label {\n  display: inline-block;\n  vertical-align: middle;\n  width: 15em;\n}\n\n.form-group.required .control-label:after {\n  content: \"*\";\n  color: red;\n}\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-new/collaborator-new.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-new/collaborator-new.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"newUserForm\" class=\"form-inline\" (ngSubmit)=\"createUser()\">\n  <h2 class=\"text-center text-primary\">Création d'utilisateur</h2>\n  <hr />\n  <div class=\"form-group required\">\n    <label class='control-label' for=\"employeeNumber\">Matricule: </label>\n    <input [ngClass]=\"{\n            'is-invalid':\n              (newUserForm.get('employeeNumber')?.errors &&\n              newUserForm.get('employeeNumber').touched) ||\n              (newUserForm.get('employeeNumber').touched &&\n              newUserForm.get('employeeNumber').hasError('employeeNumberIsTaken'))\n          }\" class=\"form-control mb-1\" placeholder=\"Matricule\" formControlName=\"employeeNumber\" />\n    <div class=\"invalid-feedback\" *ngIf=\"\n            newUserForm.get('employeeNumber').touched &&\n            newUserForm.get('employeeNumber').hasError('required')\n          \">\n      Le matricule est requis\n    </div>\n    <div class=\"invalid-feedback\" *ngIf=\"newUserForm.get('employeeNumber').hasError('employeeNumberIsTaken') && newUserForm.get('employeeNumber').touched\">Ce matricule est déjà pris</div>\n    <div *ngIf=\"newUserForm.get('employeeNumber').pending\">\n      <img src=\"https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif\" width=\"50px\" alt=\"\">\n    </div>\n  </div>\n\n  <div class=\"form-group required\">\n    <label class='control-label' for=\"email\">Email: </label>\n    <input [ngClass]=\"{\n            'is-invalid':\n            (newUserForm.get('email')?.errors &&\n            newUserForm.get('email').touched) ||\n            (newUserForm.get('email').touched &&\n            newUserForm.get('email').hasError('email')) ||\n            (newUserForm.get('email').touched &&\n            newUserForm.get('email').hasError('emailIsTaken'))\n          }\" type=\"text\" class=\"form-control mb-1\" placeholder=\"Email\" formControlName=\"email\" />\n    <div class=\"invalid-feedback\" *ngIf=\"newUserForm.get('email').hasError('required') && newUserForm.get('email').touched\">Email est requis</div>\n    <div class=\"invalid-feedback\" *ngIf=\"newUserForm.get('email').hasError('email') && newUserForm.get('email').touched\">Email est invalide</div>\n    <div class=\"invalid-feedback\" *ngIf=\"newUserForm.get('email').hasError('emailIsTaken') && newUserForm.get('email').touched\">Cet email est déjà pris</div>\n    <div *ngIf=\"newUserForm.get('email').pending\">\n      <img src=\"https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif\" width=\"50px\" alt=\"\">\n    </div>\n  </div>\n\n  <div class=\"form-group required\">\n    <label class='control-label' for=\"firstName\">Prénom: </label>\n    <input [ngClass]=\"{\n          'is-invalid':\n            newUserForm.get('firstName')?.errors &&\n            newUserForm.get('firstName').touched\n        }\" class=\"form-control mb-1\" placeholder=\"Prénom\" formControlName=\"firstName\" />\n    <div class=\"invalid-feedback\" *ngIf=\"\n          newUserForm.get('firstName').touched &&\n          newUserForm.get('firstName').hasError('required')\n        \">\n      Le prénom est requis\n    </div>\n  </div>\n\n  <div class=\"form-group required\">\n    <label class='control-label' for=\"lastName\">Nom: </label>\n    <input [ngClass]=\"{\n            'is-invalid':\n              newUserForm.get('lastName')?.errors &&\n              newUserForm.get('lastName').touched\n          }\" class=\"form-control mb-1\" placeholder=\"Nom\" formControlName=\"lastName\" />\n    <div class=\"invalid-feedback\" *ngIf=\"\n            newUserForm.get('lastName').touched &&\n            newUserForm.get('lastName').hasError('required')\n          \">\n      Nom est requis\n    </div>\n  </div>\n\n  <div class=\"form-group required\">\n    <label class='control-label' for=\"title\">Fonction: </label>\n    <input [ngClass]=\"{\n              'is-invalid':\n                newUserForm.get('title')?.errors &&\n                newUserForm.get('title').touched\n            }\" class=\"form-control mb-1\" placeholder=\"Fonction\" formControlName=\"title\" />\n    <div class=\"invalid-feedback\" *ngIf=\"\n              newUserForm.get('title').touched &&\n              newUserForm.get('title').hasError('required')\n            \">\n      Fonction est requise\n    </div>\n  </div>\n\n  <div class=\"form-group required\">\n    <label class='control-label' for=\"userStatusId\">Statut: </label>\n    <select class=\"form-control mb-1\" style=\"width: 200px\" id=\"userStatusId\" formControlName=\"userStatusId\">\n      <option [ngValue]=\"null\" disabled>Choisissez un statut</option>\n      <option *ngFor=\"let us of userStatusList\" [ngValue]=\"us.id\">\n        {{ us.name }}\n      </option>\n    </select>\n  </div>\n\n  <div class=\"form-group required\">\n    <label class='control-label' for=\"departmentId\">Direction: </label>\n    <select class=\"form-control mb-1\" style=\"width: 200px\" id=\"departmentId\" formControlName=\"departmentId\">\n      <option [ngValue]=\"null\" disabled>Choisissez une direction</option>\n      <option *ngFor=\"let dpt of departmentList\" [ngValue]=\"dpt.id\">\n        {{ dpt.name }}\n      </option>\n    </select>\n  </div>\n\n  <div class=\"form-group required\">\n    <label class='control-label' for=\"recruitmentDate\">Date de recrutement: </label>\n    <input [ngClass]=\"{\n            'is-invalid':\n              newUserForm.get('recruitmentDate')?.errors &&\n              newUserForm.get('recruitmentDate').touched\n          }\" class=\"form-control mb-1\" placeholder=\"Date de recrutement\" id=\"recruitmentDate\" formControlName=\"recruitmentDate\"\n      type=\"text\" bsDatepicker [bsConfig]=\"bsConfig\" />\n    <div class=\"invalid-feedback\" *ngIf=\"\n            newUserForm.get('recruitmentDate').touched &&\n            newUserForm.get('recruitmentDate').hasError('required')\n          \">\n      Date de recrutement est requise\n    </div>\n  </div>\n\n  <div class=\"form-group\">\n    <input type=\"checkbox\" class=\"form-check-input\" [checked]=\"notifyUser\" (change)=\"notifyUser = !notifyUser\">\n    <h6>Avertir l'utilisateur par email pour changer le mot de passe par défaut (\n      <b>Password123</b>)</h6>\n  </div>\n\n  <div class=\"form-group\">\n    <div class=\"float-right\">\n      <button class=\"btn btn-success mr-2\" type=\"submit\" [disabled]=\"!newUserForm.valid || !newUserForm.dirty\">\n        Soumettre\n      </button>\n      <button class=\"btn btn-primary\" type=\"button\" (click)=\"cancel()\">\n        Annuler\n      </button>\n    </div>\n  </div>\n\n</form>\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-new/collaborator-new.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-new/collaborator-new.component.ts ***!
  \******************************************************************************/
/*! exports provided: CollaboratorNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollaboratorNewComponent", function() { return CollaboratorNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../_services/admin.service */ "./src/app/_services/admin.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CollaboratorNewComponent = /** @class */ (function () {
    function CollaboratorNewComponent(fb, adminService, alertify) {
        this.fb = fb;
        this.adminService = adminService;
        this.alertify = alertify;
        this.departmentList = [];
        this.userStatusList = [];
        this.cancelRegister = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.switchOffRegister = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.notifyUser = false;
        this.loading = false;
    }
    CollaboratorNewComponent.prototype.ngOnInit = function () {
        this.bsConfig = {
            containerClass: 'theme-red',
            dateInputFormat: 'YYYY-MM-DD'
        };
        this.createUserForm();
    };
    CollaboratorNewComponent.prototype.createUserForm = function () {
        this.newUserForm = this.fb.group({
            employeeNumber: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, this.checkValidEmployeeNumber.bind(this)],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email], this.checkValidEmail.bind(this)],
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            userStatusId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            departmentId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            recruitmentDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    CollaboratorNewComponent.prototype.checkValidEmployeeNumber = function (control) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.adminService.employeeNumberAlreadyExists(control.value).subscribe(function (result) {
                if (result) {
                    resolve({ employeeNumberIsTaken: true });
                }
                else {
                    resolve(null);
                }
            }, function (error) {
                _this.alertify.error(error);
                resolve(null);
            });
        });
    };
    CollaboratorNewComponent.prototype.checkValidEmail = function (control) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.adminService.emailAlreadyExists(control.value).subscribe(function (result) {
                if (result) {
                    resolve({ emailIsTaken: true });
                }
                else {
                    resolve(null);
                }
            }, function (error) {
                _this.alertify.error(error);
                resolve(null);
            });
        });
    };
    CollaboratorNewComponent.prototype.createUser = function () {
        var _this = this;
        this.loading = true;
        if (this.newUserForm.valid) {
            this.newUser = Object.assign({}, this.newUserForm.value);
            this.adminService.createUser(this.notifyUser, this.newUser).subscribe(function (next) {
                _this.loading = false;
                _this.alertify.success('Utilisateur créé avec succès');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            }, function () {
                _this.switchOffRegister.emit(true);
            });
        }
    };
    CollaboratorNewComponent.prototype.cancel = function () {
        this.cancelRegister.emit(false);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], CollaboratorNewComponent.prototype, "departmentList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], CollaboratorNewComponent.prototype, "userStatusList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CollaboratorNewComponent.prototype, "cancelRegister", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CollaboratorNewComponent.prototype, "switchOffRegister", void 0);
    CollaboratorNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-collaborator-new',
            template: __webpack_require__(/*! ./collaborator-new.component.html */ "./src/app/collaborators/collaborator-new/collaborator-new.component.html"),
            styles: [__webpack_require__(/*! ./collaborator-new.component.css */ "./src/app/collaborators/collaborator-new/collaborator-new.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _services_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"]])
    ], CollaboratorNewComponent);
    return CollaboratorNewComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/collaborator-search/collaborator-search.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-search/collaborator-search.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/collaborators/collaborator-search/collaborator-search.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-search/collaborator-search.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <div class=\"card mt-2 mb-2\">\n    <div class=\"card-header\">\n      <form #searchForm=\"ngForm\" (ngSubmit)=\"searchUsers()\" class=\"form-inline\">\n        <div class=\"form-group\">\n          <input name=\"searchTerm\" [(ngModel)]=\"searchTerm.userToSearch\" type=\"text\" class=\"form-control mr-2\" placeholder=\"Tous les utilisateurs\"\n          />\n        </div>\n        <div class=\"form-group\">\n          <select class=\"form-control mr-2\" name=\"userStatus\" [(ngModel)]=\"searchTerm.userStatusId\">\n            <option [ngValue]=\"0\" disabled selected>Tous les statuts</option>\n            <option *ngFor=\"let us of userStatusList\" [ngValue]=\"us.id\">\n              {{ us.name }}\n            </option>\n          </select>\n        </div>\n        <div class=\"form-group float-right\">\n          <button type=\"submit\" class=\"btn btn-primary mr-2\">Chercher</button>\n          <button type=\"button\" class=\"btn btn-info\" (click)=\"resetSearch()\">Réinitialiser</button>\n        </div>\n      </form>\n    </div>\n\n    <div class=\"card-body\">\n      <div class=\"float-right mb-1\">\n        <button class=\"btn btn-info mr-2\" (click)=\"$event.stopPropagation()\" (click)=\"executeAction()\" [disabled]=\"disableAction()\">\n          {{actionLabel}}\n        </button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"bsModalRef.hide()\">Annuler</button>\n      </div>\n\n      <table *ngIf=\"users?.length > 0\" class=\"table table-hover\" style=\"cursor: pointer\">\n        <tr>\n          <th style=\"width: 5%\">\n            <input class=\"form-check-input\" type=\"checkbox\" (change)=\"selectAll()\" [checked]=\"selectedAll\" data-toggle=\"tooltip\" data-placement=\"top\"\n              title=\"Tout sélectionner/désélectionner\">\n          </th>\n          <th style=\"width: 20%\">Prénom</th>\n          <th style=\"width: 20%\">Nom</th>\n          <th style=\"width: 15%\">Statut</th>\n          <th style=\"width: 20%\">Direction</th>\n          <th style=\"width: 20%\">Derniere fiche d'évaluation</th>\n        </tr>\n        <tr *ngFor=\"let user of users\">\n          <td>\n            <input class=\"form-check-input\" type=\"checkbox\" value=\"{{user.id}}\" [(ngModel)]=\"user.selected\" (change)=\"checkIfAllSelected()\">\n          </td>\n          <td>{{ user.firstName }}</td>\n          <td>{{ user.lastName }}</td>\n          <td>{{user.userStatus.name}}</td>\n          <td>{{ user.department.name }}</td>\n          <td>{{ user.lastEvaluationFile }}</td>\n        </tr>\n      </table>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/collaborator-search/collaborator-search.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/collaborators/collaborator-search/collaborator-search.component.ts ***!
  \************************************************************************************/
/*! exports provided: CollaboratorSearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollaboratorSearchComponent", function() { return CollaboratorSearchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CollaboratorSearchComponent = /** @class */ (function () {
    function CollaboratorSearchComponent(adminService, bsModalRef, alertify) {
        this.adminService = adminService;
        this.bsModalRef = bsModalRef;
        this.alertify = alertify;
        this.userStatusList = [];
        this.actionEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loading = false;
        this.selectedUsers = [];
    }
    CollaboratorSearchComponent.prototype.ngOnInit = function () {
        this.searchTerm = { userToSearch: '', userStatusId: 0 };
    };
    CollaboratorSearchComponent.prototype.selectAll = function () {
        this.selectedAll = !this.selectedAll;
        for (var i = 0; i < this.users.length; i++) {
            this.users[i].selected = this.selectedAll;
        }
    };
    CollaboratorSearchComponent.prototype.checkIfAllSelected = function () {
        var totalSelected = 0;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].selected)
                totalSelected++;
        }
        this.selectedAll = totalSelected === this.users.length;
        return true;
    };
    CollaboratorSearchComponent.prototype.resetSearch = function () {
        this.searchTerm = { userToSearch: '', userStatusId: 0 };
        this.users = [];
    };
    CollaboratorSearchComponent.prototype.searchUsers = function () {
        var _this = this;
        this.loading = true;
        this.adminService.searchUsers(this.searchTerm).subscribe(function (users) {
            _this.users = users;
            _this.loading = false;
            if (_this.users.length === 0) {
                _this.alertify.error("Aucun utilisateur trouver!");
            }
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    CollaboratorSearchComponent.prototype.executeAction = function () {
        this.selectedUsers = [];
        var selectedUser = {};
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].selected) {
                selectedUser = Object.assign({}, this.users[i]);
                this.selectedUsers.push(selectedUser);
            }
        }
        this.actionEvent.emit(this.selectedUsers);
        this.bsModalRef.hide();
    };
    CollaboratorSearchComponent.prototype.disableAction = function () {
        if (this.users === undefined)
            return true;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].selected) {
                return false;
            }
        }
        return true;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], CollaboratorSearchComponent.prototype, "actionLabel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], CollaboratorSearchComponent.prototype, "userStatusList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CollaboratorSearchComponent.prototype, "actionEvent", void 0);
    CollaboratorSearchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-collaborator-search',
            template: __webpack_require__(/*! ./collaborator-search.component.html */ "./src/app/collaborators/collaborator-search/collaborator-search.component.html"),
            styles: [__webpack_require__(/*! ./collaborator-search.component.css */ "./src/app/collaborators/collaborator-search/collaborator-search.component.css")]
        }),
        __metadata("design:paramtypes", [_services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
    ], CollaboratorSearchComponent);
    return CollaboratorSearchComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/evaluator-assignment/evaluator-assignment.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/collaborators/evaluator-assignment/evaluator-assignment.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".panel-body {\n  overflow-y: scroll;\n  height: 500px;\n}\n"

/***/ }),

/***/ "./src/app/collaborators/evaluator-assignment/evaluator-assignment.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/collaborators/evaluator-assignment/evaluator-assignment.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<accordion>\n  <accordion-group heading=\"Évaluateurs\" isOpen=\"true\">\n    <button class=\"btn btn-secondary w-60 mr-1\" (click)=\"openModalForEvaluators()\">\n      Assigner évaluateurs\n    </button>\n    <div class=\"alert alert-danger mt-3\" role=\"alert\" *ngIf=\"evaluators?.length === 0\">\n      Aucun évaluateur n'a été affecté à {{evaluated.firstName}} {{evaluated.lastName}}!\n    </div>\n\n    <div class=\"card mt-3\" *ngIf=\"evaluators?.length > 0\">\n      <div class=\"card-header\">\n        Les évaluateurs assignés à {{evaluated.firstName}} {{evaluated.lastName}}:\n      </div>\n      <div class=\"card-body\">\n        <ul>\n          <li class=\"list-inline-item\" *ngFor=\"let evaluator of evaluators\">\n            <app-evaluator [evaluator]=\"evaluator\" (deleteEvaluatorEvent)=\"handleDeleteEvaluator($event)\" (updateRankOfEvaluatorEvent)=\"handleUpdateRankOfEvaluator($event)\"></app-evaluator>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </accordion-group>\n  <accordion-group heading=\"Évalués\">\n    <button class=\"btn btn-secondary w-60 mr-1\" (click)=\"openModalForEvaluatees()\">\n      Assigner évalués\n    </button>\n    <div class=\"alert alert-info mt-3\" role=\"alert\" *ngIf=\"evaluatees?.length === 0\">\n      Aucun évalué n'a été affecté à {{evaluated.firstName}} {{evaluated.lastName}}!\n    </div>\n\n    <div class=\"card mt-3\" *ngIf=\"evaluatees?.length > 0\">\n      <div class=\"card-header\">\n        Les évalués assignés à {{evaluated.firstName}} {{evaluated.lastName}}:\n      </div>\n      <div class=\"card-body\">\n        <table class=\"table table-hover\" style=\"cursor: pointer\">\n          <tr>\n            <th style=\"width: 30%\">Nom</th>\n            <th style=\"width: 35%\">Fonction</th>\n            <th style=\"width: 30%\">Direction</th>\n            <th style=\"width: 5%\"></th>\n          </tr>\n          <tr *ngFor=\"let evaluatee of evaluatees\">\n            <td>{{ evaluatee.fullName }}</td>\n            <td>{{ evaluatee.title }}</td>\n            <td>{{ evaluatee.departmentName }}</td>\n            <td>\n              <button class=\"btn btn-danger\" (click)=\"$event.stopPropagation()\" (click)=\"deleteEvaluatee(evaluatee)\">\n                <i class=\"fa fa-trash\"></i>\n              </button>\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n\n  </accordion-group>\n</accordion>\n"

/***/ }),

/***/ "./src/app/collaborators/evaluator-assignment/evaluator-assignment.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/collaborators/evaluator-assignment/evaluator-assignment.component.ts ***!
  \**************************************************************************************/
/*! exports provided: EvaluatorAssignmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluatorAssignmentComponent", function() { return EvaluatorAssignmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _collaborator_search_collaborator_search_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../collaborator-search/collaborator-search.component */ "./src/app/collaborators/collaborator-search/collaborator-search.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EvaluatorAssignmentComponent = /** @class */ (function () {
    function EvaluatorAssignmentComponent(modalService, adminService, alertify) {
        this.modalService = modalService;
        this.adminService = adminService;
        this.alertify = alertify;
        this.loading = false;
    }
    EvaluatorAssignmentComponent.prototype.ngOnInit = function () {
        this.getUserStatus();
        this.loadEvaluators();
        this.loadEvaluatees();
    };
    EvaluatorAssignmentComponent.prototype.getUserStatus = function () {
        var _this = this;
        if (localStorage.getItem('userStatusList')) {
            this.userStatusList = JSON.parse(localStorage.getItem('userStatusList'));
        }
        else {
            this.loading = true;
            this.adminService.getUserStatus().subscribe(function (result) {
                _this.loading = false;
                _this.userStatusList = result;
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            });
        }
    };
    EvaluatorAssignmentComponent.prototype.openModalForEvaluators = function () {
        var _this = this;
        var initialState = {
            userStatusList: this.userStatusList,
            actionLabel: 'Assigner comme évaluateur'
        };
        this.bsModalRef = this.modalService.show(_collaborator_search_collaborator_search_component__WEBPACK_IMPORTED_MODULE_4__["CollaboratorSearchComponent"], { initialState: initialState, class: 'modal-lg' });
        this.bsModalRef.content.actionEvent.subscribe(function (users) {
            _this.loading = true;
            var userIds = users.map(function (u) { return u.id; });
            _this.adminService.addEvaluatorToUser(_this.evaluated.id, userIds)
                .subscribe(function () {
                _this.loading = false;
                _this.loadEvaluators();
                _this.alertify.success('Les évaluateurs ont été ajoutés avec succès');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            });
        });
    };
    EvaluatorAssignmentComponent.prototype.openModalForEvaluatees = function () {
        var _this = this;
        var initialState = {
            userStatusList: this.userStatusList,
            actionLabel: 'Assigner comme évalué'
        };
        this.bsModalRef = this.modalService.show(_collaborator_search_collaborator_search_component__WEBPACK_IMPORTED_MODULE_4__["CollaboratorSearchComponent"], { initialState: initialState, class: 'modal-lg' });
        this.bsModalRef.content.actionEvent.subscribe(function (users) {
            _this.loading = true;
            var userIds = users.map(function (u) { return u.id; });
            _this.adminService.addEvaluateeToUser(_this.evaluated.id, userIds)
                .subscribe(function () {
                _this.loading = false;
                _this.loadEvaluatees();
                _this.alertify.success('Les évalués ont été ajoutés avec succès');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            });
        });
    };
    EvaluatorAssignmentComponent.prototype.handleUpdateRankOfEvaluator = function (event) {
        var _this = this;
        this.loading = true;
        this.adminService.updateRankOfEvaluator(this.evaluated.id, event.id, event.rank)
            .subscribe(function (next) {
            _this.loading = false;
            _this.alertify.success('Mise à jour du rang réussie');
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    EvaluatorAssignmentComponent.prototype.loadEvaluators = function () {
        var _this = this;
        this.loading = true;
        this.adminService.loadEvaluators(this.evaluated.id)
            .subscribe(function (evaluators) {
            _this.loading = false;
            _this.evaluators = evaluators;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    EvaluatorAssignmentComponent.prototype.loadEvaluatees = function () {
        var _this = this;
        this.loading = true;
        this.adminService.loadEvaluatees(this.evaluated.id)
            .subscribe(function (evaluatees) {
            _this.loading = false;
            _this.evaluatees = evaluatees;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    EvaluatorAssignmentComponent.prototype.handleDeleteEvaluator = function (event) {
        var _this = this;
        this.alertify.confirm("Etes-vous s\u00FBr de vouloir supprimer l'\u00E9valuateur " + event.fullName + "?", function () {
            _this.loading = true;
            _this.adminService
                .deleteEvaluator(event.id, _this.evaluated.id)
                .subscribe(function () {
                _this.loading = false;
                _this.loadEvaluators();
                _this.alertify.success('L\'évaluateur a été supprimé.');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error('Échec de la suppression d\'évaluateur.');
            });
        });
    };
    EvaluatorAssignmentComponent.prototype.deleteEvaluatee = function (evaluatee) {
        var _this = this;
        this.alertify.confirm("Etes-vous s\u00FBr de vouloir supprimer l'\u00E9valu\u00E9 " + evaluatee.fullName + "?", function () {
            _this.loading = true;
            _this.adminService
                .deleteEvaluatee(evaluatee.id, _this.evaluated.id)
                .subscribe(function () {
                _this.loading = false;
                _this.loadEvaluatees();
                _this.alertify.success('L\'évalué a été supprimé.');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error('Échec de la suppression d\'évalué.');
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EvaluatorAssignmentComponent.prototype, "evaluated", void 0);
    EvaluatorAssignmentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-evaluator-assignment',
            template: __webpack_require__(/*! ./evaluator-assignment.component.html */ "./src/app/collaborators/evaluator-assignment/evaluator-assignment.component.html"),
            styles: [__webpack_require__(/*! ./evaluator-assignment.component.css */ "./src/app/collaborators/evaluator-assignment/evaluator-assignment.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalService"], _services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
    ], EvaluatorAssignmentComponent);
    return EvaluatorAssignmentComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/evaluator/evaluator.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/collaborators/evaluator/evaluator.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/collaborators/evaluator/evaluator.component.html":
/*!******************************************************************!*\
  !*** ./src/app/collaborators/evaluator/evaluator.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card text-center\" style=\"width: 15rem;\">\n  <div class=\"card-body\">\n    <h6 class=\"card-title text-center mb-1\">\n      {{ evaluator.fullName }}\n    </h6>\n    <p class=\"text-muted\">{{ evaluator.title }}</p>\n    <p class=\"text-muted\">{{ evaluator.departmentName }}</p>\n    <p *ngIf=\"!editing\" class=\"card-text text-center\">\n      Rang d'évaluateur:\n      <span class=\"badge badge-success\">{{ evaluator.rank }}</span>\n    </p>\n    <div *ngIf=\"editing\" class=\"mb-2\">\n      <label>Rang d'évaluateur:</label>\n      <input type=\"number\" min=\"0\" max=\"100\" [value]=\"evaluator.rank\" (input)=\"onRankChange(rank.value)\" #rank>\n    </div>\n    <button class=\"btn btn-sm\" [ngClass]=\"editing ? 'btn-success' : 'btn-info'\" (click)=\"toggleEdit()\">\n      <i *ngIf=\"editing\" class=\"fa fa-save\"></i>\n      <i *ngIf=\"!editing\" class=\"fa fa-edit\"></i>\n    </button>\n  </div>\n  <div class=\"card-footer\">\n    <button class=\"btn btn-sm btn-danger\" (click)=\"$event.stopPropagation()\" (click)=\"deleteEvaluator()\">\n      <i class=\"fa fa-trash\"></i>\n    </button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/evaluator/evaluator.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/collaborators/evaluator/evaluator.component.ts ***!
  \****************************************************************/
/*! exports provided: EvaluatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluatorComponent", function() { return EvaluatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EvaluatorComponent = /** @class */ (function () {
    function EvaluatorComponent() {
        this.updateRankOfEvaluatorEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.deleteEvaluatorEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.editing = false;
    }
    EvaluatorComponent.prototype.ngOnInit = function () {
    };
    EvaluatorComponent.prototype.onRankChange = function (value) {
        this.evaluator.rank = value;
    };
    EvaluatorComponent.prototype.toggleEdit = function () {
        if (this.editing) {
            this.updateRankOfEvaluatorEvent.emit(this.evaluator);
        }
        this.editing = !this.editing;
    };
    EvaluatorComponent.prototype.deleteEvaluator = function () {
        this.deleteEvaluatorEvent.emit(this.evaluator);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EvaluatorComponent.prototype, "evaluator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluatorComponent.prototype, "updateRankOfEvaluatorEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluatorComponent.prototype, "deleteEvaluatorEvent", void 0);
    EvaluatorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-evaluator',
            template: __webpack_require__(/*! ./evaluator.component.html */ "./src/app/collaborators/evaluator/evaluator.component.html"),
            styles: [__webpack_require__(/*! ./evaluator.component.css */ "./src/app/collaborators/evaluator/evaluator.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EvaluatorComponent);
    return EvaluatorComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/forget-password/forget-password.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/collaborators/forget-password/forget-password.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user_card {\n  height: 400px;\n  width: 550px;\n  margin-top: auto;\n  margin-bottom: auto;\n  background: #E95420;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  padding: 10px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  border-radius: 5px;\n}\n\n.brand_logo_container {\n  position: absolute;\n  height: 170px;\n  width: 170px;\n  top: -75px;\n  border-radius: 50%;\n  background: #c34113;\n  padding: 10px;\n  text-align: center;\n}\n\n.brand_logo {\n  height: 150px;\n  width: 150px;\n  border-radius: 50%;\n  border: 2px solid white;\n}\n\n.header {\n  margin-top: 50px;\n}\n\n.form_container {\n  margin-top: 10px;\n}\n\n.login_container {\n  padding: 0 2rem;\n  color: white !important;\n}\n\n.input-group-text {\n  background: #c34113 !important;\n  color: white !important;\n  border: 0 !important;\n  border-radius: 0.25rem 0 0 0.25rem !important;\n  margin-right: 5px;\n  width: 60px;\n}\n\n.input_user,\n.input_pass:focus {\n  box-shadow: none !important;\n  outline: 0px !important;\n}\n\n.links a {\n  color: #fff !important;\n}\n\nh3 {\n  color: #fff !important;\n}\n"

/***/ }),

/***/ "./src/app/collaborators/forget-password/forget-password.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/collaborators/forget-password/forget-password.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n  <div class=\"container h-100\">\n    <div class=\"d-flex justify-content-center h-100\">\n      <div class=\"user_card\">\n        <div class=\"d-flex justify-content-center\">\n          <div class=\"brand_logo_container\">\n            <img src=\"../../assets/logo.png\" class=\"brand_logo\" height=\"\" alt=\"Logo\">\n          </div>\n        </div>\n\n        <div class=\"header\">\n          <h3>Demande de réinitialisation de password</h3>\n        </div>\n\n        <div class=\"d-flex justify-content-center form_container\">\n          <form #forgetPasswordForm=\"ngForm\" (ngSubmit)=\"requestResetPassword()\">\n            <div class=\"input-group mb-2\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text\">\n                  <label>Email:</label>\n                </span>\n              </div>\n              <input class=\"form-control input_user\" type=\"text\" [(ngModel)]=\"model.email\" required name=\"email\">\n            </div>\n            <div class=\"d-flex justify-content-center mt-3 login_container\">\n              <button type=\"submit\" [disabled]=\"!forgetPasswordForm.valid\" class=\"btn btn-success btn-lg\">Obtenir le lien de réinitialisation</button>\n            </div>\n          </form>\n        </div>\n\n        <div class=\"mt-4\">\n          <div class=\"d-flex justify-content-center links\">\n            <a [routerLink]=\"['/home']\">Retour à la page d'accueil</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/forget-password/forget-password.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/collaborators/forget-password/forget-password.component.ts ***!
  \****************************************************************************/
/*! exports provided: ForgetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgetPasswordComponent", function() { return ForgetPasswordComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ForgetPasswordComponent = /** @class */ (function () {
    function ForgetPasswordComponent(router, authService, alertify) {
        this.router = router;
        this.authService = authService;
        this.alertify = alertify;
        this.model = {};
        this.loading = false;
    }
    ForgetPasswordComponent.prototype.ngOnInit = function () {
    };
    ForgetPasswordComponent.prototype.requestResetPassword = function () {
        var _this = this;
        this.loading = true;
        this.authService.requestResetPassword(this.model).subscribe(function (next) {
            _this.loading = false;
            _this.alertify.success('Demande est faite avec succèes');
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        }, function () {
            _this.router.navigate(['/home']);
        });
    };
    ForgetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-forget-password',
            template: __webpack_require__(/*! ./forget-password.component.html */ "./src/app/collaborators/forget-password/forget-password.component.html"),
            styles: [__webpack_require__(/*! ./forget-password.component.css */ "./src/app/collaborators/forget-password/forget-password.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"], _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"]])
    ], ForgetPasswordComponent);
    return ForgetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/photo-editor/photo-editor.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/collaborators/photo-editor/photo-editor.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img.img-thumbnail {\n  height: 100px;\n  min-width: 100ox !important;\n  margin-bottom: 2px;\n}\n\n.nv-file-over {\n  border: dotted 3px red;\n}\n\ninput[type='file'] {\n  color: transparent;\n}\n\n.not-approved {\n  opacity: 0.2;\n}\n\n.img-wrapper {\n  position: relative;\n}\n\n.img-text {\n  position: absolute;\n  bottom: 30%;\n}\n"

/***/ }),

/***/ "./src/app/collaborators/photo-editor/photo-editor.component.html":
/*!************************************************************************!*\
  !*** ./src/app/collaborators/photo-editor/photo-editor.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-2 img-wrapper\" *ngFor=\"let photo of photos\">\n    <img src=\"{{ photo.url }}\" class=\"img-thumbnail p1\" alt=\"\" [ngClass]=\"!photo.isApproved && 'not-approved'\" />\n    <div class=\"text-center img-text\" *ngIf=\"!photo.isApproved\">\n      <span class=\"text-danger\">Awaiting approval</span>\n    </div>\n\n    <div class=\"text-center\">\n      <button type=\"button\" class=\"btn btn-sm mr-1\" (click)=\"setMainPhoto(photo)\" [disabled]=\"photo.isMain || !photo.isApproved\"\n        [ngClass]=\"photo.isMain ? 'btn-success active' : 'btn-secondary'\">\n        <i class=\"fa fa-home\"></i>\n      </button>\n      <button type=\"button\" class=\"btn btn-sm btn-danger\" (click)=\"deletePhoto(photo.id)\" [disabled]=\"photo.isMain\">\n        <i class=\"fa fa-trash-o\"></i>\n      </button>\n    </div>\n  </div>\n</div>\n\n<div class=\"row mt-3\" *ngIf=\"photos.length < 2\">\n  <div class=\"col-md-3\">\n    <h5>Ajouter maximum 2 photos</h5>\n\n    <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" />\n  </div>\n\n  <div class=\"col-md-9\" style=\"margin-bottom: 40px\" *ngIf=\"uploader?.queue?.length\">\n    <h3>File d'attente de téléchargement</h3>\n    <p>Longueur de la file d'attente: {{ uploader?.queue?.length }}</p>\n\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <th width=\"50%\">Nom</th>\n          <th>Taille</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let item of uploader.queue\">\n          <td>\n            <strong>{{ item?.file?.name }}</strong>\n          </td>\n          <td *ngIf=\"uploader.options.isHTML5\" nowrap>\n            {{ item?.file?.size / 1024 / 1024 | number: '.2' }} MB\n          </td>\n        </tr>\n      </tbody>\n    </table>\n\n    <div>\n      <div>\n        Progression de la file d'attente:\n        <div class=\"progress mb-4\">\n          <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ width: uploader.progress + '%' }\"></div>\n        </div>\n      </div>\n      <button type=\"button\" class=\"btn btn-success btn-s  mr-1\" (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n        <span class=\"fa fa-upload\"></span> Télécharger\n      </button>\n      <button type=\"button\" class=\"btn btn-warning btn-s  mr-1\" (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\">\n        <span class=\"fa fa-ban\"></span> Annuler\n      </button>\n      <button type=\"button\" class=\"btn btn-danger btn-s\" (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\n        <span class=\"fa fa-trash\"></span> Retirer\n      </button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/photo-editor/photo-editor.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/collaborators/photo-editor/photo-editor.component.ts ***!
  \**********************************************************************/
/*! exports provided: PhotoEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoEditorComponent", function() { return PhotoEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PhotoEditorComponent = /** @class */ (function () {
    function PhotoEditorComponent(authService, userService, alertifyService) {
        this.authService = authService;
        this.userService = userService;
        this.alertifyService = alertifyService;
        this.getMemberPhotoChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.hasBaseDropZoneOver = false;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl;
        this.loading = false;
    }
    PhotoEditorComponent.prototype.ngOnInit = function () {
        this.initializeUploader();
    };
    PhotoEditorComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    PhotoEditorComponent.prototype.initializeUploader = function () {
        var _this = this;
        this.uploader = new ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__["FileUploader"]({
            url: this.baseUrl +
                'users/' +
                this.authService.decodedToken.nameid +
                '/photos',
            authToken: 'Bearer ' + localStorage.getItem('token'),
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024
        });
        this.uploader.onAfterAddingFile = function (file) {
            file.withCredentials = false;
        };
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            if (response) {
                var res = JSON.parse(response);
                var photo = {
                    id: res.id,
                    url: res.url,
                    dateAdded: res.dateAdded,
                    description: res.description,
                    isMain: res.isMain,
                    isApproved: res.isApproved
                };
                _this.photos.push(photo);
                if (photo.isMain) {
                    _this.authService.changeMemberPhoto(photo.url);
                    _this.authService.currentUser.photoUrl = photo.url;
                    localStorage.setItem('user', JSON.stringify(_this.authService.currentUser));
                }
            }
        };
        this.uploader.onErrorItem = function (item, response, status, headers) {
            _this.alertifyService.error(response);
        };
    };
    PhotoEditorComponent.prototype.setMainPhoto = function (photo) {
        var _this = this;
        this.loading = true;
        this.userService
            .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
            .subscribe(function () {
            _this.loading = false;
            _this.currentMain = _this.photos.filter(function (p) { return p.isMain === true; })[0];
            _this.currentMain.isMain = false;
            photo.isMain = true;
            //this.getMemberPhotoChange.emit(photo.url);
            _this.authService.changeMemberPhoto(photo.url);
            _this.authService.currentUser.photoUrl = photo.url;
            localStorage.setItem('user', JSON.stringify(_this.authService.currentUser));
        }, function (error) {
            _this.loading = false;
            _this.alertifyService.error(error);
        });
    };
    PhotoEditorComponent.prototype.deletePhoto = function (id) {
        var _this = this;
        this.alertifyService.confirm('Etes-vous sûr de vouloir supprimer cette photo?', function () {
            _this.loading = true;
            _this.userService
                .deletePhoto(_this.authService.decodedToken.nameid, id)
                .subscribe(function () {
                _this.loading = false;
                _this.photos.splice(_this.photos.findIndex(function (p) { return p.id === id; }), 1);
                _this.alertifyService.success('La photo a été supprimée');
            }, function (error) {
                _this.loading = false;
                _this.alertifyService.error('Échec de la suppression de la photo');
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], PhotoEditorComponent.prototype, "photos", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PhotoEditorComponent.prototype, "getMemberPhotoChange", void 0);
    PhotoEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-photo-editor',
            template: __webpack_require__(/*! ./photo-editor.component.html */ "./src/app/collaborators/photo-editor/photo-editor.component.html"),
            styles: [__webpack_require__(/*! ./photo-editor.component.css */ "./src/app/collaborators/photo-editor/photo-editor.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], PhotoEditorComponent);
    return PhotoEditorComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/profile-edit/profile-edit.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/collaborators/profile-edit/profile-edit.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".img-thumbnail {\n  margin: 25px;\n  width: 85%;\n  height: 85%;\n}\n\n.card-body {\n  padding: 0 25px;\n}\n\n.card-footer {\n  padding: 10px 15ps;\n  background-color: #fff;\n  border-top: none;\n}\n"

/***/ }),

/***/ "./src/app/collaborators/profile-edit/profile-edit.component.html":
/*!************************************************************************!*\
  !*** ./src/app/collaborators/profile-edit/profile-edit.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-4\">\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <h1>Votre profil</h1>\n    </div>\n    <div class=\"col-sm-8\">\n      <div *ngIf=\"editForm.dirty\" class=\"alert alert-info\">\n        <p>\n          <strong>Information:</strong>\n          Vous avez apporté des modifications. Toute modification non enregistrée sera perdue!\n        </p>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <img class=\"card-img-top img-thumbnail\" src=\"{{ photoUrl || '../../../assets/user.png' }}\" alt=\"{{ user.lastName }}\" />\n        <div class=\"card-body\">\n          <div>\n            <strong>Nom complet:</strong>\n            <p>{{ user.firstName }} {{user.lastName}}</p>\n            <strong>Direction:</strong>\n            <p>{{ user.department.name }}</p>\n          </div>\n          <div>\n            <strong>Dernière visite:</strong>\n            <p>{{ user.lastActive | timeAgo }}</p>\n          </div>\n        </div>\n        <div class=\"card-footer\">\n          <button class=\"btn btn-success w-80 mr-5\" [disabled]=\"!editForm.dirty || editForm.invalid\" form=\"editForm\">\n            Sauvegarder\n          </button>\n          <button class=\"btn btn-primary w-60\" type=\"button\" (click)=\"cancel()\">\n            Annuler\n          </button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-8\">\n      <div class=\"tab-panel\">\n        <tabset class=\"member-tabset\">\n          <tab heading=\"Editer Profile\">\n            <form #editForm=\"ngForm\" id=\"editForm\" (ngSubmit)=\"updateUser()\">\n              <h4>Prénom:</h4>\n              <input type=\"text\" name=\"firstName\" rows=\"6\" class=\"form-control\" [(ngModel)]=\"user.firstName\" #firstName=\"ngModel\" [ngClass]=\"{ 'is-invalid': firstName.invalid }\" required/>\n              <div *ngIf=\"firstName.invalid && (firstName.dirty || firstName.touched)\" class=\"invalid-feedback\">\n                <div *ngIf=\"firstName.errors.required\">Le prénom est requis.</div>\n              </div>\n\n              <h4>Nom:</h4>\n              <input type=\"text\" name=\"lastName\" rows=\"6\" class=\"form-control\" [(ngModel)]=\"user.lastName\" #lastName=\"ngModel\" [ngClass]=\"{ 'is-invalid': lastName.invalid }\" required/>\n              <div *ngIf=\"lastName.invalid && (lastName.dirty || lastName.touched)\" class=\"invalid-feedback\">\n                <div *ngIf=\"lastName.errors.required\">Le nom est requis.</div>\n              </div>\n              \n              <h4>Fonction:</h4>\n              <input type=\"text\" name=\"title\" rows=\"6\" class=\"form-control\" [(ngModel)]=\"user.title\" #title=\"ngModel\" [ngClass]=\"{ 'is-invalid': title.invalid }\" required/>\n              <div *ngIf=\"title.invalid && (title.dirty || title.touched)\" class=\"invalid-feedback\">\n                <div *ngIf=\"title.errors.required\">La fonction est requise.</div>\n              </div>\n\n              <hr />\n              <h4>Matricule:</h4>\n              <p>{{ user.employeeNumber }}</p>\n              <h4>Email:</h4>\n              <p>{{ user.email }}</p>\n              <h4>Date de recrutement:</h4>\n              <p>{{ user.recruitmentDate | date: 'mediumDate'}}</p>\n            </form>\n          </tab>\n          <tab heading=\"Editer Photos\">\n            <app-photo-editor [photos]=\"user.photos\" (getMemberPhotoChange)=\"updateMainPhoto($event)\"></app-photo-editor>\n          </tab>\n        </tabset>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/profile-edit/profile-edit.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/collaborators/profile-edit/profile-edit.component.ts ***!
  \**********************************************************************/
/*! exports provided: ProfileEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileEditComponent", function() { return ProfileEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileEditComponent = /** @class */ (function () {
    function ProfileEditComponent(route, alertify, userService, authService, router) {
        this.route = route;
        this.alertify = alertify;
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.loading = false;
    }
    ProfileEditComponent.prototype.unloadNotification = function ($event) {
        if (this.editForm.dirty) {
            $event.returnValue = true;
        }
    };
    ProfileEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.user = data['user'];
        });
        this.authService.currentPhotoUrl.subscribe(function (photoUrl) { return (_this.photoUrl = photoUrl); });
    };
    ProfileEditComponent.prototype.updateUser = function () {
        var _this = this;
        this.loading = true;
        this.userService
            .updateProfile(this.authService.decodedToken.nameid, this.user)
            .subscribe(function (next) {
            _this.loading = false;
            _this.alertify.success('Mise à jour du profil réussie');
            _this.editForm.reset(_this.user);
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    ProfileEditComponent.prototype.updateMainPhoto = function (photoUrl) {
        this.user.photoUrl = photoUrl;
    };
    ProfileEditComponent.prototype.cancel = function () {
        this.router.navigate(['/home']);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('editForm'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"])
    ], ProfileEditComponent.prototype, "editForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:beforeunload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ProfileEditComponent.prototype, "unloadNotification", null);
    ProfileEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile-edit',
            template: __webpack_require__(/*! ./profile-edit.component.html */ "./src/app/collaborators/profile-edit/profile-edit.component.html"),
            styles: [__webpack_require__(/*! ./profile-edit.component.css */ "./src/app/collaborators/profile-edit/profile-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], ProfileEditComponent);
    return ProfileEditComponent;
}());



/***/ }),

/***/ "./src/app/collaborators/reset-password/reset-password.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/collaborators/reset-password/reset-password.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user_card {\n  height: 500px;\n  width: 500px;\n  margin-top: auto;\n  margin-bottom: auto;\n  background: #E95420;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  padding: 10px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  border-radius: 5px;\n}\n\n.brand_logo_container {\n  position: absolute;\n  height: 170px;\n  width: 170px;\n  top: -75px;\n  border-radius: 50%;\n  background: #c34113;\n  padding: 10px;\n  text-align: center;\n}\n\n.brand_logo {\n  height: 150px;\n  width: 150px;\n  border-radius: 50%;\n  border: 2px solid white;\n}\n\n.header {\n  margin-top: 50px;\n}\n\n.form_container {\n  margin-top: 10px;\n}\n\n.login_container {\n  padding: 0 2rem;\n  color: white !important;\n}\n\n.input-group-text {\n  background: #c34113 !important;\n  color: white !important;\n  border: 0 !important;\n  border-radius: 0.25rem 0 0 0.25rem !important;\n  margin-right: 5px;\n  width: 200px;\n}\n\n.input_user,\n.input_pass:focus {\n  box-shadow: none !important;\n  outline: 0px !important;\n}\n\n.links a {\n  color: #fff !important;\n}\n\nh3 {\n  color: #fff !important;\n}\n"

/***/ }),

/***/ "./src/app/collaborators/reset-password/reset-password.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/collaborators/reset-password/reset-password.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n  <div class=\"container h-100\">\n    <div class=\"d-flex justify-content-center h-100\">\n      <div class=\"user_card\">\n        <div class=\"d-flex justify-content-center\">\n          <div class=\"brand_logo_container\">\n            <img src=\"../../assets/logo.png\" class=\"brand_logo\" height=\"\" alt=\"Logo\">\n          </div>\n        </div>\n\n        <div class=\"header\">\n          <h3>Réinitialisation de votre mot de passe</h3>\n        </div>\n\n        <div class=\"d-flex justify-content-center form_container\">\n          <form [formGroup]=\"resetPasswordForm\" (ngSubmit)=\"resetPassword()\">\n            <div class=\"input-group mb-2\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text\">\n                  <label>Nouveau Password:</label>\n                </span>\n              </div>\n              <input [ngClass]=\"{\n        'is-invalid':\n          resetPasswordForm.get('password').errors &&\n          resetPasswordForm.get('password').touched\n      }\" type=\"password\" class=\"form-control input_pass\" [(ngModel)]=\"model.newPassword\" formControlName=\"password\" />\n              <div class=\"input-group-text\" *ngIf=\"\n        resetPasswordForm.get('password').hasError('required') &&\n        resetPasswordForm.get('password').touched\n      \">\n                Password is required\n              </div>\n              <div class=\"input-group-text\" *ngIf=\"\n        resetPasswordForm.get('password').hasError('minlength') &&\n        resetPasswordForm.get('password').touched\n      \">\n                Password must be at least 4 characters\n              </div>\n              <div class=\"input-group-text\" *ngIf=\"\n        resetPasswordForm.get('password').hasError('maxlength') &&\n        resetPasswordForm.get('password').touched\n      \">\n                Password cannot exceed 8 characters\n              </div>\n            </div>\n            <div class=\"input-group mb-2\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text\">\n                  <label>Confirmez Password:</label>\n                </span>\n              </div>\n              <input [ngClass]=\"{\n        'is-invalid':\n          (resetPasswordForm.get('confirmPassword').errors &&\n            resetPasswordForm.get('confirmPassword').touched) ||\n          (resetPasswordForm.get('confirmPassword').touched &&\n            resetPasswordForm.hasError('mismatch'))\n      }\" type=\"password\" class=\"form-control input_pass\" [(ngModel)]=\"model.confirmNewPassword\" formControlName=\"confirmPassword\"\n              />\n              <div class=\"input-group-text\" *ngIf=\"\n        resetPasswordForm.get('confirmPassword').hasError('required') &&\n        resetPasswordForm.get('confirmPassword').touched\n      \">\n                Password is required\n              </div>\n              <div class=\"input-group-text\" *ngIf=\"\n        resetPasswordForm.hasError('mismatch') &&\n        resetPasswordForm.get('confirmPassword').touched\n      \">\n                Password must match\n              </div>\n            </div>\n            <div class=\"input-group mb-2\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text\">\n                  <label>Jeton de retour:</label>\n                </span>\n              </div>\n              <input class=\"form-control input_user\" type=\"text\" [(ngModel)]=\"model.token\" formControlName=\"token\">\n            </div>\n            <div class=\"d-flex justify-content-center mt-3 login_container\">\n              <button type=\"submit\" [disabled]=\"!resetPasswordForm.valid \" class=\"btn btn-success btn-lg\">Créer</button>\n            </div>\n          </form>\n        </div>\n\n        <div class=\"mt-4\">\n          <div class=\"d-flex justify-content-center links\">\n            <a [routerLink]=\"['/home']\">Retour à la page d'accueil</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/collaborators/reset-password/reset-password.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/collaborators/reset-password/reset-password.component.ts ***!
  \**************************************************************************/
/*! exports provided: ResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function() { return ResetPasswordComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(fb, router, route, authService, alertify) {
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.alertify = alertify;
        this.model = {};
        this.loading = false;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.model.token = params['token'];
            _this.model.email = params['email'];
        });
        this.createResetPasswordForm();
    };
    ResetPasswordComponent.prototype.createResetPasswordForm = function () {
        this.resetPasswordForm = this.fb.group({
            password: [
                '',
                [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(24)
                ]
            ],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            token: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        }, { validator: this.passwordMatchValidator });
    };
    ResetPasswordComponent.prototype.passwordMatchValidator = function (g) {
        return g.get('password').value === g.get('confirmPassword').value
            ? null
            : { mismatch: true };
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.loading = true;
        this.authService.resetPassword(this.model).subscribe(function (next) {
            _this.loading = false;
            _this.alertify.success('Réinitialisation avec succès');
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        }, function () {
            _this.router.navigate(['/home']);
        });
    };
    ResetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__(/*! ./reset-password.component.html */ "./src/app/collaborators/reset-password/reset-password.component.html"),
            styles: [__webpack_require__(/*! ./reset-password.component.css */ "./src/app/collaborators/reset-password/reset-password.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["ActivatedRoute"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user_card {\n  height: 400px;\n  width: 350px;\n  margin-top: auto;\n  margin-bottom: auto;\n  background: #E95420;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  padding: 10px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  border-radius: 5px;\n}\n\n.brand_logo_container {\n  position: absolute;\n  height: 170px;\n  width: 170px;\n  top: -75px;\n  border-radius: 50%;\n  background: #c34113;\n  padding: 10px;\n  text-align: center;\n}\n\n.brand_logo {\n  height: 150px;\n  width: 150px;\n  border-radius: 50%;\n  border: 2px solid white;\n}\n\n.form_container {\n  margin-top: 100px;\n}\n\n.login_container {\n  padding: 0 2rem;\n  color: white !important;\n}\n\n.input-group-text {\n  background: #c34113 !important;\n  color: white !important;\n  border: 0 !important;\n  border-radius: 0.25rem 0 0 0.25rem !important;\n}\n\n.input_user,\n.input_pass:focus {\n  box-shadow: none !important;\n  outline: 0px !important;\n}\n\n.links a {\n  color: #fff !important;\n}\n"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n  <div *ngIf=\"loggedIn()\" style=\"text-align: center\">\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h1>Sothema Goal Management</h1>\n        <p class=\"lead\">\n          Bienvenue à Sothema Goal Management Application!\n        </p>\n      </div>\n\n      <div class=\"card-body\">\n        <ul class=\"list-inline member-icons animate text-center\">\n          <li class=\"list-inline-item\">\n            <div class=\"card text-center\" style=\"width: 20rem;\">\n              <div class=\"card-body\">\n                <h6 class=\"card-title text-center mb-1\">\n                  Lorem ipsum dolor sit amet, consectetur adipiscing elit\n                </h6>\n                <p class=\"card-text text-muted text-center\">\n                  Donec adipiscing tristique risus nec feugiat. Eget nunc scelerisque viverra mauris in. Tellus molestie nunc non blandit massa\n                  enim nec dui nunc. Elit eget gravida cum sociis. Congue eu consequat ac felis donec et.\n                </p>\n              </div>\n            </div>\n          </li>\n\n          <li class=\"list-inline-item\">\n            <div class=\"card text-center\" style=\"width: 20rem;\">\n              <div class=\"card-body\">\n                <h6 class=\"card-title text-center mb-1\">\n                  Euismod lacinia at quis risus sed vulputate odio ut\n                </h6>\n                <p class=\"card-text text-muted text-center\">\n                  Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Sit amet dictum sit amet justo donec. Leo in vitae turpis\n                  massa sed elementum.Quis viverra nibh cras pulvinar mattis nunc sed.\n                </p>\n              </div>\n            </div>\n          </li>\n\n          <li class=\"list-inline-item\">\n            <div class=\"card text-center\" style=\"width: 20rem;\">\n              <div class=\"card-body\">\n                <h6 class=\"card-title text-center mb-1\">\n                  Euismod lacinia at quis risus sed vulputate odio ut\n                </h6>\n                <p class=\"card-text text-muted text-center\">\n                  Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Sit amet dictum sit amet justo donec. Leo in vitae turpis\n                  massa sed elementum.Quis viverra nibh cras pulvinar mattis nunc sed.\n                </p>\n              </div>\n            </div>\n          </li>\n\n          <li class=\"list-inline-item\">\n            <div class=\"card text-center\" style=\"width: 20rem;\">\n              <div class=\"card-body\">\n                <h6 class=\"card-title text-center mb-1\">\n                  Euismod lacinia at quis risus sed vulputate odio ut\n                </h6>\n                <p class=\"card-text text-muted text-center\">\n                  Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Sit amet dictum sit amet justo donec. Leo in vitae turpis\n                  massa sed elementum.Quis viverra nibh cras pulvinar mattis nunc sed.\n                </p>\n              </div>\n            </div>\n          </li>\n\n          <li class=\"list-inline-item\">\n            <div class=\"card text-center\" style=\"width: 20rem;\">\n              <div class=\"card-body\">\n                <h6 class=\"card-title text-center mb-1\">\n                  Euismod lacinia at quis risus sed vulputate odio ut\n                </h6>\n                <p class=\"card-text text-muted text-center\">\n                  Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Sit amet dictum sit amet justo donec. Leo in vitae turpis\n                  massa sed elementum.Quis viverra nibh cras pulvinar mattis nunc sed.\n                </p>\n              </div>\n            </div>\n          </li>\n\n          <li class=\"list-inline-item\">\n            <div class=\"card text-center\" style=\"width: 20rem;\">\n              <div class=\"card-body\">\n                <h6 class=\"card-title text-center mb-1\">\n                  Magnis dis parturient montes nascetur ridiculus\n                </h6>\n                <p class=\"card-text text-muted text-center\">\n                  Urna duis convallis convallis tellus. At volutpat diam ut venenatis tellus in metus vulputate. Augue lacus viverra vitae\n                  congue eu. Lorem mollis aliquam ut porttitor leo a diam. Porta non pulvinar neque laoreet suspendisse.\n                </p>\n              </div>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n\n  </div>\n\n  <div *ngIf=\"!loggedIn()\" class=\"container h-100\">\n    <div class=\"d-flex justify-content-center h-100\">\n      <div class=\"user_card\">\n        <div class=\"d-flex justify-content-center\">\n          <div class=\"brand_logo_container\">\n            <img src=\"../../assets/logo.png\" class=\"brand_logo\" height=\"\" alt=\"Logo\">\n          </div>\n        </div>\n        <div class=\"d-flex justify-content-center form_container\">\n          <form #loginForm=\"ngForm\" (ngSubmit)=\"login()\">\n            <div class=\"input-group mb-3\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text\">\n                  <i class=\"fa fa-user\"></i>\n                </span>\n              </div>\n              <input class=\"form-control input_user\" type=\"text\" placeholder=\"Adresse Email\" [(ngModel)]=\"model.username\" required name=\"username\">\n            </div>\n            <div class=\"input-group mb-2\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text\">\n                  <i class=\"fa fa-key\"></i>\n                </span>\n              </div>\n              <input class=\"form-control input_pass\" type=\"password\" placeholder=\"Mot de Passe\" [(ngModel)]=\"model.password\" required name=\"password\">\n            </div>\n            <div class=\"d-flex justify-content-center mt-3 login_container\">\n              <button type=\"submit\" [disabled]=\"!loginForm.valid\" class=\"btn btn-success btn-lg\">Connecter</button>\n            </div>\n          </form>\n        </div>\n\n        <div class=\"mt-4\">\n          <div class=\"d-flex justify-content-center links\">\n            <a [routerLink]=\"['/requestResetPassword']\">Mot de passe oublié?</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = /** @class */ (function () {
    function HomeComponent(authService, alertify, router) {
        this.authService = authService;
        this.alertify = alertify;
        this.router = router;
        this.registerMode = false;
        this.model = {};
        this.loading = false;
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent.prototype.loggedIn = function () {
        return this.authService.loggedIn();
    };
    HomeComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authService.login(this.model).subscribe(function (next) {
            _this.loading = false;
            _this.alertify.success('Connecté avec succès');
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        }, function () {
            _this.router.navigate(['']);
        });
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component.css":
/*!****************************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component.css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component.html":
/*!*****************************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-4\">\n  <div class=\"row\">\n    <h1>Compétence Comportementale détail</h1>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div>\n            <strong>Compétence:</strong>\n            <p>{{ behavioralSkill.skill }}</p>\n          </div>\n          <div>\n            <strong>Définition:</strong>\n            <p>{{ behavioralSkill.definition }}</p>\n          </div>\n          <div>\n            <strong>Statut:</strong>\n            <p>{{ behavioralSkill.status }}</p>\n          </div>\n          <div *ngIf=\"behavioralSkill.sealed\">\n            <strong>Date scellée:</strong>\n            <p>{{ behavioralSkill.sealedDate | date: 'mediumDate' }}</p>\n          </div>\n          <div>\n            <strong>Auteur:</strong>\n            <p>{{ behavioralSkill.createdByName }}</p>\n          </div>\n          <div>\n            <strong>Créé:</strong>\n            <p>{{ behavioralSkill.created | date: 'mediumDate' }}</p>\n          </div>\n        </div>\n        <div class=\"card-footer\">\n          <div class=\"btn-group d-fles\">\n            <button class=\"btn btn-success w-80 mr-1\" [routerLink]=\"['/hr']\" [queryParams]=\"{ tab: 1 }\">\n              Retour au List\n            </button>\n            <button class=\"btn btn-secondary w-60 mr-1\" (click)=\"clone()\">\n              Coloner\n            </button>\n            <button class=\"btn btn-danger\" (click)=\"delete()\" *ngIf=\"!behavioralSkill.sealed\">\n              <i class=\"fa fa-trash\"></i>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-8\">\n      <div class=\"tab-panel\">\n        <tabset class=\"strategy-tabset\" #strategyTabs>\n          <tab heading=\"Niveau 1\">\n            <div class=\"card\">\n              <div class=\"card-body\">\n                <h5 class=\"card-title\">{{behavioralSkill.levelOne}}</h5>\n                <h6 class=\"card-subtitle mb-2 text-muted\">Note: {{behavioralSkill.levelOneGrade}}</h6>\n                <p class=\"card-text\">{{behavioralSkill.levelOneDescription}}</p>\n              </div>\n            </div>\n          </tab>\n          <tab heading=\"Niveau 2\">\n            <div class=\"card\">\n              <div class=\"card-body\">\n                <h5 class=\"card-title\">{{behavioralSkill.levelTwo}}</h5>\n                <h6 class=\"card-subtitle mb-2 text-muted\">Note: {{behavioralSkill.levelTwoGrade}}</h6>\n                <p class=\"card-text\">{{behavioralSkill.levelTwoDescription}}</p>\n              </div>\n            </div>\n          </tab>\n          <tab heading=\"Niveau 3\">\n            <div class=\"card\">\n              <div class=\"card-body\">\n                <h5 class=\"card-title\">{{behavioralSkill.levelThree}}</h5>\n                <h6 class=\"card-subtitle mb-2 text-muted\">Note: {{behavioralSkill.levelThreeGrade}}</h6>\n                <p class=\"card-text\">{{behavioralSkill.levelThreeDescription}}</p>\n              </div>\n            </div>\n          </tab>\n          <tab heading=\"Niveau 4\">\n            <div class=\"card\">\n              <div class=\"card-body\">\n                <h5 class=\"card-title\">{{behavioralSkill.levelFour}}</h5>\n                <h6 class=\"card-subtitle mb-2 text-muted\">Note: {{behavioralSkill.levelFourGrade}}</h6>\n                <p class=\"card-text\">{{behavioralSkill.levelFourDescription}}</p>\n              </div>\n            </div>\n          </tab>\n        </tabset>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: BehavioralSkillDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BehavioralSkillDetailComponent", function() { return BehavioralSkillDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BehavioralSkillDetailComponent = /** @class */ (function () {
    function BehavioralSkillDetailComponent(hrService, authService, alertify, route, router) {
        this.hrService = hrService;
        this.authService = authService;
        this.alertify = alertify;
        this.route = route;
        this.router = router;
        this.loading = false;
    }
    BehavioralSkillDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.behavioralSkill = data['behavioralSkill'];
        });
    };
    BehavioralSkillDetailComponent.prototype.clone = function () {
        var _this = this;
        this.loading = true;
        this.hrService
            .cloneBehavioralSkill(this.authService.decodedToken.nameid, this.behavioralSkill.id)
            .subscribe(function () {
            _this.loading = false;
            _this.alertify.success('La compétence a été clonée avec succès');
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        }, function () {
            _this.router.navigate(['/hr'], { queryParams: { tab: 1 } });
        });
    };
    BehavioralSkillDetailComponent.prototype.delete = function () {
        var _this = this;
        this.alertify.confirm('Etes-vous sur de vouloir supprimer cette compétence?', function () {
            _this.loading = true;
            _this.hrService.deleteBehavioralSkill(_this.behavioralSkill.id)
                .subscribe(function () {
                _this.loading = false;
                _this.alertify.success('La compétence a été supprimée');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error('Impossible de supprimer la compétence: ' + error);
            }, function () {
                _this.router.navigate(['/hr'], { queryParams: { tab: 1 } });
            });
        });
    };
    BehavioralSkillDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-behavioral-skill-detail',
            template: __webpack_require__(/*! ./behavioral-skill-detail.component.html */ "./src/app/hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component.html"),
            styles: [__webpack_require__(/*! ./behavioral-skill-detail.component.css */ "./src/app/hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_services_hr_service__WEBPACK_IMPORTED_MODULE_2__["HrService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], BehavioralSkillDetailComponent);
    return BehavioralSkillDetailComponent;
}());



/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component.css":
/*!************************************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component.css ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component.html":
/*!*************************************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h5 class=\"modal-title pull-left\">Modifier Compétence Comportementale</h5>\n  <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form #behavioralSkillForm=\"ngForm\" id=\"behavioralSkillForm\">\n\n    <h6>Compétence:</h6>\n    <input [readonly]=\"isReadOnly\" [(ngModel)]=\"behavioralSkill.skill\" name=\"skill\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"Compétence\"\n    />\n\n\n    <h6>Définition:</h6>\n    <textarea [readonly]=\"isReadOnly\" rowa=\"3\" [(ngModel)]=\"behavioralSkill.definition\" name=\"definition\" required type=\"text\" class=\"form-control input-sm\"\n      placeholder=\"Definition\"></textarea>\n\n    <h6>Statut:</h6>\n    <select class=\"form-control mb-1\" style=\"width: 200px\" id=\"status\" name=\"status\" [(ngModel)]=\"behavioralSkill.status\" required [disabled]=\"isReadOnly\">\n      <option *ngFor=\"let status of statusList\" [ngValue]=\"status\">\n        {{ status }}\n      </option>\n    </select>\n\n    <accordion>\n      <accordion-group heading=\"Niveau 1\" [isOpen]=\"isFirstOpen\">\n        <div class=\"card-body\">\n          <input [readonly]=\"isReadOnly\" [(ngModel)]=\"behavioralSkill.levelOne\" name=\"levelOne\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"Niveau 1\"\n          />\n          <h6>Niveau 1 Note:</h6>\n          <input [readonly]=\"isReadOnly\" [(ngModel)]=\"behavioralSkill.levelOneGrade\" name=\"levelOneGrade\" required type=\"number\" class=\"form-control input-sm\"\n            placeholder=\"Niveau 1 Note\" />\n\n          <h6>Niveau 1 Description:</h6>\n          <textarea [readonly]=\"isReadOnly\" rowa=\"3\" [(ngModel)]=\"behavioralSkill.levelOneDescription\" name=\"levelOneDescription\" class=\"form-control input-sm\"\n            placeholder=\"Niveau 1 description\"></textarea>\n        </div>\n      </accordion-group>\n      <accordion-group heading=\"Niveau 2\">\n        <div class=\"card-body\">\n          <input [readonly]=\"isReadOnly\" [(ngModel)]=\"behavioralSkill.levelTwo\" name=\"levelTwo\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"Niveau 2\"\n          />\n          <h6>Niveau 2 Note:</h6>\n          <input [readonly]=\"isReadOnly\" [(ngModel)]=\"behavioralSkill.levelTwoGrade\" name=\"levelTwoGrade\" required type=\"number\" class=\"form-control input-sm\"\n            placeholder=\"Niveau 2 Note\" />\n\n          <h6>Niveau 2 Description:</h6>\n          <textarea [readonly]=\"isReadOnly\" rowa=\"3\" [(ngModel)]=\"behavioralSkill.levelTwoDescription\" name=\"levelTwoDescription\" class=\"form-control input-sm\"\n            placeholder=\"Niveau 2 description\"></textarea>\n        </div>\n      </accordion-group>\n      <accordion-group heading=\"Niveau 3\">\n        <div class=\"card-body\">\n          <input [readonly]=\"isReadOnly\" [(ngModel)]=\"behavioralSkill.levelThree\" name=\"levelThree\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"Niveau 3\"\n          />\n          <h6>Niveau 2 Note:</h6>\n          <input [readonly]=\"isReadOnly\" [(ngModel)]=\"behavioralSkill.levelThreeGrade\" name=\"levelThreeGrade\" required type=\"number\" class=\"form-control input-sm\"\n            placeholder=\"Niveau 3 Note\" />\n\n          <h6>Niveau 2 Description:</h6>\n          <textarea [readonly]=\"isReadOnly\" rowa=\"3\" [(ngModel)]=\"behavioralSkill.levelThreeDescription\" name=\"levelThreeDescription\" class=\"form-control input-sm\"\n            placeholder=\"Niveau 2 description\"></textarea>\n        </div>\n      </accordion-group>\n      <accordion-group heading=\"Niveau 4\">\n        <div class=\"card-body\">\n          <input [readonly]=\"isReadOnly\" [(ngModel)]=\"behavioralSkill.levelFour\" name=\"levelFour\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"Niveau 4\"\n          />\n          <h6>Niveau 4 Note:</h6>\n          <input [readonly]=\"isReadOnly\" [(ngModel)]=\"behavioralSkill.levelFourGrade\" name=\"levelFourGrade\" required type=\"number\" class=\"form-control input-sm\"\n            placeholder=\"Niveau 4 Note\" />\n\n          <h6>Niveau 4 Description:</h6>\n          <textarea [readonly]=\"isReadOnly\" rowa=\"3\" [(ngModel)]=\"behavioralSkill.levelFourDescription\" name=\"levelFourDescription\" class=\"form-control input-sm\"\n            placeholder=\"Niveau 4 description\"></textarea>\n        </div>\n      </accordion-group>\n    </accordion>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"bsModalRef.hide()\">Annuler</button>\n  <button type=\"button\" class=\"btn btn-success\" (click)=\"updateBehavioralSkill()\" form=\"behavioralSkillForm\" [disabled]=\"!behavioralSkillForm.valid || !behavioralSkillForm.dirty\">Mettre à jour</button>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: BehavioralSkillEditModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BehavioralSkillEditModalComponent", function() { return BehavioralSkillEditModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BehavioralSkillEditModalComponent = /** @class */ (function () {
    function BehavioralSkillEditModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.updateSelectedBehavioralSkill = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isFirstOpen = true;
    }
    BehavioralSkillEditModalComponent.prototype.ngOnInit = function () {
        if (this.behavioralSkill.sealed) {
            this.isReadOnly = true;
        }
    };
    BehavioralSkillEditModalComponent.prototype.updateBehavioralSkill = function () {
        this.updateSelectedBehavioralSkill.emit(this.behavioralSkill);
        this.bsModalRef.hide();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BehavioralSkillEditModalComponent.prototype, "updateSelectedBehavioralSkill", void 0);
    BehavioralSkillEditModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-behavioral-skill-edit-modal',
            template: __webpack_require__(/*! ./behavioral-skill-edit-modal.component.html */ "./src/app/hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component.html"),
            styles: [__webpack_require__(/*! ./behavioral-skill-edit-modal.component.css */ "./src/app/hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"]])
    ], BehavioralSkillEditModalComponent);
    return BehavioralSkillEditModalComponent;
}());



/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-list/behavioral-skill-list.component.css":
/*!************************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-list/behavioral-skill-list.component.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-list/behavioral-skill-list.component.html":
/*!*************************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-list/behavioral-skill-list.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div *ngIf=\"!creationMode\">\n    <app-hr-filter-create-actions [statusList]=\"statusList\" [dataType]=\"dataType\" (loadDataEvent)=\"handleLoadBehavioralSkills($event)\"\n      (creationModeEvent)=\"handleCreationMode($event)\"></app-hr-filter-create-actions>\n\n    <br />\n\n    <div class=\"row\">\n      <table class=\"table table-hover\" style=\"cursor: pointer\">\n        <tr>\n          <th style=\"width: 30%\">Compétence</th>\n          <th style=\"width: 15%\">Statut</th>\n          <th style=\"width: 20%\">Auteur</th>\n          <th style=\"width: 15%\">Date de création</th>\n          <th style=\"width: 20%\"></th>\n        </tr>\n\n        <tr *ngFor=\"let behavioralSkill of behavioralSkills\" [routerLink]=\"['/behavioralSkills', behavioralSkill.id]\">\n          <td>{{behavioralSkill.skill}}</td>\n          <td>{{behavioralSkill.status}}</td>\n          <td>{{behavioralSkill.createdByName}}</td>\n          <td>{{behavioralSkill.created | date: 'mediumDate'}}</td>\n          <td>\n            <button *ngIf=\"behavioralSkill.status !== 'Archivée'\" class=\"btn btn-info\" (click)=\"$event.stopPropagation()\" (click)=\"editBehavioralSkillModal(behavioralSkill)\">Editer</button>\n          </td>\n        </tr>\n\n      </table>\n    </div>\n  </div>\n\n  <div *ngIf=\"creationMode\">\n    <app-behavioral-skill-new (cancelCreation)=\"cancelCreationMode($event)\" (switchOffCreation)=\"switchOffCreationMode($event)\"></app-behavioral-skill-new>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-list/behavioral-skill-list.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-list/behavioral-skill-list.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: BehavioralSkillListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BehavioralSkillListComponent", function() { return BehavioralSkillListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _behavioral_skill_edit_modal_behavioral_skill_edit_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../behavioral-skill-edit-modal/behavioral-skill-edit-modal.component */ "./src/app/hr/behavioral-skills/behavioral-skill-edit-modal/behavioral-skill-edit-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BehavioralSkillListComponent = /** @class */ (function () {
    function BehavioralSkillListComponent(modalService) {
        this.modalService = modalService;
        this.loadBehavioralSkillsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.editBehavioralSkillEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.filters = {};
        this.creationMode = false;
    }
    BehavioralSkillListComponent.prototype.ngOnInit = function () {
        this.dataType = 'behavioralSkill';
        this.loadBehavioralSkillsEvent.emit(this.filters);
    };
    BehavioralSkillListComponent.prototype.resetFilters = function () {
        this.filters.status = '';
        this.loadBehavioralSkillsEvent.emit(this.filters);
    };
    BehavioralSkillListComponent.prototype.creationToggle = function () {
        this.creationMode = true;
    };
    BehavioralSkillListComponent.prototype.cancelCreationMode = function (creationMode) {
        this.creationMode = creationMode;
    };
    BehavioralSkillListComponent.prototype.switchOffCreationMode = function (reload) {
        this.creationMode = false;
        if (reload) {
            this.loadBehavioralSkillsEvent.emit(this.filters);
        }
    };
    BehavioralSkillListComponent.prototype.handleLoadBehavioralSkills = function (event) {
        this.filters = event;
        this.loadBehavioralSkillsEvent.emit(this.filters);
    };
    BehavioralSkillListComponent.prototype.handleCreationMode = function (event) {
        this.creationMode = event;
    };
    BehavioralSkillListComponent.prototype.editBehavioralSkillModal = function (behavioralSkill) {
        var _this = this;
        var initialState = {
            behavioralSkill: behavioralSkill,
            statusList: this.statusList
        };
        this.bsModalRef = this.modalService.show(_behavioral_skill_edit_modal_behavioral_skill_edit_modal_component__WEBPACK_IMPORTED_MODULE_2__["BehavioralSkillEditModalComponent"], { initialState: initialState });
        this.bsModalRef.content.updateSelectedBehavioralSkill.subscribe(function (updatedBehavioralSkill) {
            var updateParams = { updatedBehavioralSkill: updatedBehavioralSkill, filters: _this.filters };
            _this.editBehavioralSkillEvent.emit(updateParams);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], BehavioralSkillListComponent.prototype, "statusList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], BehavioralSkillListComponent.prototype, "behavioralSkills", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BehavioralSkillListComponent.prototype, "loadBehavioralSkillsEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BehavioralSkillListComponent.prototype, "editBehavioralSkillEvent", void 0);
    BehavioralSkillListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-behavioral-skill-list',
            template: __webpack_require__(/*! ./behavioral-skill-list.component.html */ "./src/app/hr/behavioral-skills/behavioral-skill-list/behavioral-skill-list.component.html"),
            styles: [__webpack_require__(/*! ./behavioral-skill-list.component.css */ "./src/app/hr/behavioral-skills/behavioral-skill-list/behavioral-skill-list.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalService"]])
    ], BehavioralSkillListComponent);
    return BehavioralSkillListComponent;
}());



/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-new/behavioral-skill-new.component.css":
/*!**********************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-new/behavioral-skill-new.component.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group>label {\n  display: inline-block;\n  vertical-align: middle;\n  width: 12em;\n}\n\n.form-group.required .control-label:after {\n  content: \"*\";\n  color: red;\n}\n"

/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-new/behavioral-skill-new.component.html":
/*!***********************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-new/behavioral-skill-new.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" d-flex justify-content-center>\n  <form [formGroup]=\"newForm\" class=\"form-inline\" (ngSubmit)=\"create()\">\n    <div class=\"col-sm-12 text-center\">\n      <h2 class=\"ext-primary\">Création d'une compétence comportementale</h2>\n      <hr />\n\n      <div class=\"form-group required\">\n        <label class='control-label' for=\"skill\">Compétence: </label>\n        <input [ngClass]=\"{\n                        'is-invalid':\n                          newForm.get('skill').errors &&\n                          newForm.get('skill').touched\n                      }\" class=\"form-control mb-1\" placeholder=\"Compétence\" formControlName=\"skill\" />\n        <div class=\"invalid-feedback\" *ngIf=\"\n                        newForm.get('skill').touched &&\n                        newForm.get('skill').hasError('required')\n                      \">\n          La compétence est requise\n        </div>\n      </div>\n\n      <div class=\"form-group required\">\n        <label class='control-label' for=\"definition\">Définition: </label>\n        <textarea formControlName=\"definition\" rows=\"4\" cols=\"50\" [ngClass]=\"{\n                              'is-invalid':\n                                newForm.get('definition').errors &&\n                                newForm.get('definition').touched\n                            }\" class=\"form-control mb-1\" placeholder=\"Définition\"></textarea>\n        <div class=\"invalid-feedback\" *ngIf=\"\n                      newForm.get('definition').touched &&\n                      newForm.get('definition').hasError('required')\n                    \">\n          La définition est requise\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-sm-3\">\n      <div class=\"form-group\">\n        <label for=\"levelOne\">Niveau 1: </label>\n        <input [ngClass]=\"{\n                            'is-invalid':\n                              newForm.get('levelOne').errors &&\n                              newForm.get('levelOne').touched\n                          }\" class=\"form-control mb-1\" placeholder=\"Compétence\" formControlName=\"levelOne\" readonly/>\n        <div class=\"invalid-feedback\" *ngIf=\"\n                            newForm.get('levelOne').touched &&\n                            newForm.get('levelOne').hasError('required')\n                          \">\n          Le niveau 1 est requis\n        </div>\n      </div>\n\n      <div class=\"form-group required\">\n        <label class='control-label' for=\"levelOneGrade\">Note de Niveau 1: </label>\n        <input type=\"number\" [ngClass]=\"{\n                              'is-invalid':\n                                newForm.get('levelOneGrade').errors &&\n                                newForm.get('levelOneGrade').touched\n                            }\" class=\"form-control mb-1\" placeholder=\"Note\" formControlName=\"levelOneGrade\" />\n        <div class=\"invalid-feedback\" *ngIf=\"\n                              newForm.get('levelOneGrade').touched &&\n                              newForm.get('levelOneGrade').hasError('required')\n                            \">\n          La note du niveau 1 est requise\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"levelOneDescription\">Description de Niveau 1: </label>\n        <textarea formControlName=\"levelOneDescription\" rows=\"3\" class=\"form-control mb-1\" placeholder=\"Description\"></textarea>\n      </div>\n    </div>\n\n\n    <div class=\"col-sm-3\">\n      <div class=\"form-group\">\n        <label for=\"levelTwo\">Niveau 2: </label>\n        <input [ngClass]=\"{\n                              'is-invalid':\n                                newForm.get('levelTwo').errors &&\n                                newForm.get('levelTwo').touched\n                            }\" class=\"form-control mb-1\" placeholder=\"Compétence\" formControlName=\"levelTwo\" readonly/>\n        <div class=\"invalid-feedback\" *ngIf=\"\n                              newForm.get('levelTwo').touched &&\n                              newForm.get('levelTwo').hasError('required')\n                            \">\n          Le niveau 2 est requis\n        </div>\n      </div>\n\n      <div class=\"form-group required\">\n        <label class='control-label' for=\"levelTwoGrade\">Note de Niveau 2: </label>\n        <input type=\"number\" [ngClass]=\"{\n                                'is-invalid':\n                                  newForm.get('levelTwoGrade').errors &&\n                                  newForm.get('levelTwoGrade').touched\n                              }\" class=\"form-control mb-1\" placeholder=\"Note\" formControlName=\"levelTwoGrade\" />\n        <div class=\"invalid-feedback\" *ngIf=\"\n                                newForm.get('levelTwoGrade').touched &&\n                                newForm.get('levelTwoGrade').hasError('required')\n                              \">\n          La note du niveau 2 est requise\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"levelTwoDescription\">Description de Niveau 2: </label>\n        <textarea formControlName=\"levelTwoDescription\" rows=\"3\" class=\"form-control mb-1\" placeholder=\"Description\"></textarea>\n      </div>\n    </div>\n\n    <div class=\"col-sm-3\">\n      <div class=\"form-group\">\n        <label for=\"levelThree\">Niveau 3: </label>\n        <input [ngClass]=\"{\n                              'is-invalid':\n                                newForm.get('levelThree').errors &&\n                                newForm.get('levelThree').touched\n                            }\" class=\"form-control mb-1\" placeholder=\"Compétence\" formControlName=\"levelThree\" readonly/>\n        <div class=\"invalid-feedback\" *ngIf=\"\n                              newForm.get('levelThree').touched &&\n                              newForm.get('levelThree').hasError('required')\n                            \">\n          Le niveau 3 est requis\n        </div>\n      </div>\n\n      <div class=\"form-group required\">\n        <label class='control-label' for=\"levelThreeGrade\">Note de Niveau 3: </label>\n        <input type=\"number\" [ngClass]=\"{\n                                'is-invalid':\n                                  newForm.get('levelThreeGrade').errors &&\n                                  newForm.get('levelThreeGrade').touched\n                              }\" class=\"form-control mb-1\" placeholder=\"Note\" formControlName=\"levelThreeGrade\" />\n        <div class=\"invalid-feedback\" *ngIf=\"\n                                newForm.get('levelThreeGrade').touched &&\n                                newForm.get('levelThreeGrade').hasError('required')\n                              \">\n          La note du niveau 3 est requise\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"levelThreeDescription\">Description de Niveau 3: </label>\n        <textarea formControlName=\"levelThreeDescription\" rows=\"3\" class=\"form-control mb-1\" placeholder=\"Description\"></textarea>\n      </div>\n    </div>\n\n    <div class=\"col-sm-3\">\n      <div class=\"form-group\">\n        <label for=\"levelFour\">Niveau 4: </label>\n        <input [ngClass]=\"{\n                              'is-invalid':\n                                newForm.get('levelFour').errors &&\n                                newForm.get('levelFour').touched\n                            }\" class=\"form-control mb-1\" placeholder=\"Compétence\" formControlName=\"levelFour\" readonly/>\n        <div class=\"invalid-feedback\" *ngIf=\"\n                              newForm.get('levelFour').touched &&\n                              newForm.get('levelFour').hasError('required')\n                            \">\n          Le niveau 4 est requis\n        </div>\n      </div>\n\n      <div class=\"form-group required\">\n        <label class='control-label' for=\"levelFourGrade\">Note de Niveau 4: </label>\n        <input type=\"number\" [ngClass]=\"{\n                                'is-invalid':\n                                  newForm.get('levelFourGrade').errors &&\n                                  newForm.get('levelFourGrade').touched\n                              }\" class=\"form-control mb-1\" placeholder=\"Note\" formControlName=\"levelFourGrade\" />\n        <div class=\"invalid-feedback\" *ngIf=\"\n                                newForm.get('levelFourGrade').touched &&\n                                newForm.get('levelFourGrade').hasError('required')\n                              \">\n          La note du niveau 4 est requise\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"levelFourDescription\">Description de Niveau 4: </label>\n        <textarea formControlName=\"levelFourDescription\" rows=\"3\" class=\"form-control mb-1\" placeholder=\"Description\"></textarea>\n      </div>\n    </div>\n\n    <div class=\"col-sm-3 offset-4 text-center\">\n      <div class=\"form-group mt-2\">\n        <button class=\"btn btn-primary mr-2\" type=\"button\" (click)=\"cancel()\">\n          Annuler\n        </button>\n\n        <button class=\"btn btn-success\" type=\"submit\" [disabled]=\"!newForm.valid\">\n          Soumettre\n        </button>\n      </div>\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/behavioral-skills/behavioral-skill-new/behavioral-skill-new.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/hr/behavioral-skills/behavioral-skill-new/behavioral-skill-new.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: BehavioralSkillNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BehavioralSkillNewComponent", function() { return BehavioralSkillNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BehavioralSkillNewComponent = /** @class */ (function () {
    function BehavioralSkillNewComponent(fb, hrService, authService, alertify) {
        this.fb = fb;
        this.hrService = hrService;
        this.authService = authService;
        this.alertify = alertify;
        this.cancelCreation = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.switchOffCreation = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loading = false;
    }
    BehavioralSkillNewComponent.prototype.ngOnInit = function () {
        this.createForm();
    };
    BehavioralSkillNewComponent.prototype.createForm = function () {
        this.newForm = this.fb.group({
            skill: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            definition: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            levelOne: ['Insatisfaisant', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            levelOneGrade: ['1', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            levelOneDescription: [''],
            levelTwo: ['A améliorer', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            levelTwoGrade: ['2', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            levelTwoDescription: [''],
            levelThree: ['Conforme aux attentes', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            levelThreeGrade: ['3', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            levelThreeDescription: [''],
            levelFour: ['Supérieur aux attentes', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            levelFourGrade: ['4', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            levelFourDescription: ['']
        });
    };
    BehavioralSkillNewComponent.prototype.create = function () {
        var _this = this;
        if (this.newForm.valid) {
            this.newBehavioralSkill = Object.assign({}, this.newForm.value);
            this.loading = true;
            this.hrService.createBehavioralSkill(this.authService.decodedToken.nameid, this.newBehavioralSkill).subscribe(function () {
                _this.loading = false;
                _this.alertify.success('Compétence comportementale créé avec succèes');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            }, function () { _this.switchOffCreation.emit(true); });
        }
    };
    BehavioralSkillNewComponent.prototype.cancel = function () {
        this.cancelCreation.emit(false);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BehavioralSkillNewComponent.prototype, "cancelCreation", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BehavioralSkillNewComponent.prototype, "switchOffCreation", void 0);
    BehavioralSkillNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-behavioral-skill-new',
            template: __webpack_require__(/*! ./behavioral-skill-new.component.html */ "./src/app/hr/behavioral-skills/behavioral-skill-new/behavioral-skill-new.component.html"),
            styles: [__webpack_require__(/*! ./behavioral-skill-new.component.css */ "./src/app/hr/behavioral-skills/behavioral-skill-new/behavioral-skill-new.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _services_hr_service__WEBPACK_IMPORTED_MODULE_3__["HrService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"]])
    ], BehavioralSkillNewComponent);
    return BehavioralSkillNewComponent;
}());



/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-file-instance-hr-list/evaluation-file-instance-hr-list.component.css":
/*!****************************************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-file-instance-hr-list/evaluation-file-instance-hr-list.component.css ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".panel-body {\n  overflow-y: scroll;\n  height: 780px;\n}\n"

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-file-instance-hr-list/evaluation-file-instance-hr-list.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-file-instance-hr-list/evaluation-file-instance-hr-list.component.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card mt-2\">\n  <div class=\"card-header\">\n    <input type=\"text\" placeholder=\"Filtrer par utilisateurs\" [(value)]=\"values\" (keyup)=\"onKeyUp($event)\" />\n  </div>\n\n  <div class=\"card-body\">\n    <table *ngIf=\"evaluationFileInstanceList?.length > 0\" class=\"table table-hover  mt-2\" style=\"cursor: pointer\">\n      <tr>\n        <th style=\"width: 30%\">Titre</th>\n        <th style=\"width: 20%\">Utilisateur</th>\n        <th style=\"width: 25%\">Pole</th>\n        <td style=\"width: 5%\"></td>\n      </tr>\n      <tr *ngFor=\"let evaluationFileInsatnce of filteredEvaluationFileInstances\">\n        <td>{{ evaluationFileInsatnce.title }}</td>\n        <td>{{ evaluationFileInsatnce.ownerName }}</td>\n        <td>{{ evaluationFileInsatnce.axisInstances[0].poleName }}</td>\n        <td>\n          <button class=\"btn btn-danger\" (click)=\"$event.stopPropagation()\" (click)=\"delete(evaluationFileInsatnce.id)\">\n            <i class=\"fa fa-trash\"></i>\n          </button>\n        </td>\n      </tr>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-file-instance-hr-list/evaluation-file-instance-hr-list.component.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-file-instance-hr-list/evaluation-file-instance-hr-list.component.ts ***!
  \***************************************************************************************************************/
/*! exports provided: EvaluationFileInstanceHrListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationFileInstanceHrListComponent", function() { return EvaluationFileInstanceHrListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EvaluationFileInstanceHrListComponent = /** @class */ (function () {
    function EvaluationFileInstanceHrListComponent() {
        this.deleteEvaluationFileInstanceEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.values = '';
    }
    EvaluationFileInstanceHrListComponent.prototype.ngOnInit = function () {
        this.actionLabel = 'Générer une fiche d\'évaluation';
        this.filteredEvaluationFileInstances = this.evaluationFileInstanceList;
    };
    EvaluationFileInstanceHrListComponent.prototype.onKeyUp = function (event) {
        var _this = this;
        this.values = event.target.value;
        this.filteredEvaluationFileInstances = this.evaluationFileInstanceList.filter(function (efi) { return efi.ownerName.toLowerCase().includes(_this.values.toLowerCase()); });
    };
    EvaluationFileInstanceHrListComponent.prototype.delete = function (id) {
        this.deleteEvaluationFileInstanceEvent.emit(id);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], EvaluationFileInstanceHrListComponent.prototype, "evaluationFileInstanceList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluationFileInstanceHrListComponent.prototype, "deleteEvaluationFileInstanceEvent", void 0);
    EvaluationFileInstanceHrListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-evaluation-file-instance-hr-list',
            template: __webpack_require__(/*! ./evaluation-file-instance-hr-list.component.html */ "./src/app/hr/evaluations/evaluation-file-instance-hr-list/evaluation-file-instance-hr-list.component.html"),
            styles: [__webpack_require__(/*! ./evaluation-file-instance-hr-list.component.css */ "./src/app/hr/evaluations/evaluation-file-instance-hr-list/evaluation-file-instance-hr-list.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EvaluationFileInstanceHrListComponent);
    return EvaluationFileInstanceHrListComponent;
}());



/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-file-instance-hr-new/evaluation-file-instance-hr-new.component.css":
/*!**************************************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-file-instance-hr-new/evaluation-file-instance-hr-new.component.css ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-file-instance-hr-new/evaluation-file-instance-hr-new.component.html":
/*!***************************************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-file-instance-hr-new/evaluation-file-instance-hr-new.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-collaborator-search [userStatusList]=\"userStatusList\" [actionLabel]=\"actionLabel\" (actionEvent)=\"handleAction($event)\"></app-collaborator-search>\n"

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-file-instance-hr-new/evaluation-file-instance-hr-new.component.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-file-instance-hr-new/evaluation-file-instance-hr-new.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: EvaluationFileInstanceHrNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationFileInstanceHrNewComponent", function() { return EvaluationFileInstanceHrNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EvaluationFileInstanceHrNewComponent = /** @class */ (function () {
    function EvaluationFileInstanceHrNewComponent() {
        this.actionEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    EvaluationFileInstanceHrNewComponent.prototype.ngOnInit = function () {
        this.actionLabel = 'Générer une fiche d\'évaluation';
    };
    EvaluationFileInstanceHrNewComponent.prototype.handleAction = function (user) {
        this.actionEvent.emit(user);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], EvaluationFileInstanceHrNewComponent.prototype, "userStatusList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluationFileInstanceHrNewComponent.prototype, "actionEvent", void 0);
    EvaluationFileInstanceHrNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-evaluation-file-instance-hr-new',
            template: __webpack_require__(/*! ./evaluation-file-instance-hr-new.component.html */ "./src/app/hr/evaluations/evaluation-file-instance-hr-new/evaluation-file-instance-hr-new.component.html"),
            styles: [__webpack_require__(/*! ./evaluation-file-instance-hr-new.component.css */ "./src/app/hr/evaluations/evaluation-file-instance-hr-new/evaluation-file-instance-hr-new.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EvaluationFileInstanceHrNewComponent);
    return EvaluationFileInstanceHrNewComponent;
}());



/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".panel-body {\n  overflow-y: scroll;\n  height: 800px;\n}\n"

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component.html":
/*!*****************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-4\">\n  <div class=\"row\">\n    <h1>Détail de modèle d'évaluation</h1>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-3\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div>\n            <strong>Titre:</strong>\n            <p>{{ evaluationFile.title }}</p>\n          </div>\n          <div>\n            <strong>Année:</strong>\n            <p>{{ evaluationFile.year }}</p>\n          </div>\n          <div>\n            <strong>Statut:</strong>\n            <p>{{ evaluationFile.status }}</p>\n          </div>\n          <div *ngIf=\"evaluationFile.sealed\">\n            <strong>Date scellée:</strong>\n            <p>{{ evaluationFile.sealedDate | date: 'mediumDate' }}</p>\n          </div>\n          <div>\n            <strong>Auteur:</strong>\n            <p>{{ evaluationFile.ownerName }}</p>\n          </div>\n          <div>\n            <strong>Créé:</strong>\n            <p>{{ evaluationFile.created | date: 'mediumDate' }}</p>\n          </div>\n        </div>\n        <div class=\"card-footer\">\n          <div class=\"btn-group d-fles\">\n            <button class=\"btn btn-success w-70 mr-1\" [routerLink]=\"['/hr']\" [queryParams]=\"{ tab: 2 }\">\n              Retour au List\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-9\">\n      <div class=\"tab-panel panel-body\">\n        <tabset class=\"strategy-tabset\" #strategyTabs>\n          <tab heading=\"Stratégie\">\n            <div class=\"container\">\n              <h4> {{evaluationFile.strategy.title}}</h4>\n              <p>{{evaluationFile.strategy.description}}</p>\n              <h4>Axes:</h4>\n              <ul>\n                <li *ngFor=\"let axis of evaluationFile.axisList\">\n                  {{axis.title}}\n                  <ol>\n                    <li *ngFor=\"let ap of axis.axisPoles\">\n                      {{ap.poleName}}\n                      <span class=\"badge badge-pill badge-danger\">\n                        {{ap.weight}} %\n                      </span>\n                    </li>\n                  </ol>\n                </li>\n              </ul>\n            </div>\n          </tab>\n          <tab heading=\"Compétence comportementale\">\n            <div class=\"container\">\n              <ul>\n                <li *ngFor=\"let bs of evaluationFile.behavioralSkills\">\n                  {{bs.skill}}\n                  <ol>\n                    <li>{{bs.levelOne}}</li>\n                    <li>{{bs.levelTwo}}</li>\n                    <li>{{bs.levelThree}}</li>\n                    <li>{{bs.levelFour}}</li>\n                  </ol>\n                </li>\n              </ul>\n            </div>\n          </tab>\n          <tab heading=\"Fiche d'évaluation\">\n            <div class=\"container\">\n              <button class=\"btn btn-secondary mt-1\" (click)=\"openModal()\" [disabled]=\"evaluationFile.status !== 'Publiée'\">\n                Générer fiche d'évaluation\n              </button>\n              <div *ngIf=\"evaluationFileInstanceList.length > 0\">\n                <app-evaluation-file-instance-hr-list [evaluationFileInstanceList]=\"evaluationFileInstanceList\" (deleteEvaluationFileInstanceEvent)=\"handleDeleteEvaluationFileInstance($event)\"></app-evaluation-file-instance-hr-list>\n              </div>\n              <div class=\"alert alert-danger mt-3\" role=\"alert\" *ngIf=\"evaluationFileInstanceList.length === 0\">\n                Aucune fiche d'évaluation n'a été générée!\n              </div>\n            </div>\n          </tab>\n          <tab heading=\"Paramétrages\">\n            Paramétrage\n          </tab>\n        </tabset>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component.ts ***!
  \***************************************************************************************/
/*! exports provided: EvaluationHrDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationHrDetailComponent", function() { return EvaluationHrDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var _collaborators_collaborator_search_collaborator_search_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../collaborators/collaborator-search/collaborator-search.component */ "./src/app/collaborators/collaborator-search/collaborator-search.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EvaluationHrDetailComponent = /** @class */ (function () {
    function EvaluationHrDetailComponent(modalService, route, hrService, adminService, authService, alertify) {
        this.modalService = modalService;
        this.route = route;
        this.hrService = hrService;
        this.adminService = adminService;
        this.authService = authService;
        this.alertify = alertify;
        this.evaluationFileInstanceList = [];
    }
    EvaluationHrDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hrService.efiObservableList.subscribe(function (efiList) {
            (_this.evaluationFileInstanceList = efiList);
        });
        this.route.data.subscribe(function (data) {
            _this.evaluationFile = data['evaluationFile'];
            _this.hrService.getEvaluationFileInstancesByEvaluationFileId(_this.evaluationFile.id).subscribe();
        });
        this.getUserStatus();
    };
    EvaluationHrDetailComponent.prototype.getUserStatus = function () {
        var _this = this;
        if (localStorage.getItem('userStatusList')) {
            this.userStatusList = JSON.parse(localStorage.getItem('userStatusList'));
        }
        else {
            this.loading = true;
            this.adminService.getUserStatus().subscribe(function (result) {
                _this.loading = false;
                _this.userStatusList = result;
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            });
        }
    };
    EvaluationHrDetailComponent.prototype.handleDeleteEvaluationFileInstance = function (evaluationFileInstanceId) {
        var _this = this;
        this.alertify.confirm('Etes-vous sur de vouloir supprimer cette Fiche d\'évaluation?', function () {
            _this.loading = true;
            _this.hrService
                .deleteEvaluationFileInstance(evaluationFileInstanceId, _this.authService.decodedToken.nameid)
                .subscribe(function () {
                _this.loading = false;
                // this.evaluationFileInstanceList.splice(
                //   this.evaluationFileInstanceList.findIndex(a => a.id === evaluationFileInstanceId),
                //   1
                // );
                _this.evaluationFileInstanceList = [];
                _this.hrService.getEvaluationFileInstancesByEvaluationFileId(_this.evaluationFile.id).subscribe();
                _this.alertify.success('La fiche d\'évaluation a été supprimée');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error('Impossible de supprimer la fiche d\'évaluation');
            });
        });
    };
    EvaluationHrDetailComponent.prototype.openModal = function () {
        var _this = this;
        var initialState = {
            userStatusList: this.userStatusList,
            actionLabel: 'Générer une fiche d\'évaluation'
        };
        this.bsModalRef = this.modalService.show(_collaborators_collaborator_search_collaborator_search_component__WEBPACK_IMPORTED_MODULE_7__["CollaboratorSearchComponent"], { initialState: initialState, class: 'modal-lg' });
        this.bsModalRef.content.actionEvent.subscribe(function (users) {
            _this.loading = true;
            _this.hrService
                .generateEvaluationFile(_this.evaluationFile.id, users)
                .subscribe(function (next) {
                _this.loading = false;
                _this.alertify.success('La fiche d\'évaluation a été générée avec succèes');
                _this.evaluationFileInstanceList = [];
                _this.hrService.getEvaluationFileInstancesByEvaluationFileId(_this.evaluationFile.id).subscribe();
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            });
        });
    };
    EvaluationHrDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-evaluation-hr-detail',
            template: __webpack_require__(/*! ./evaluation-hr-detail.component.html */ "./src/app/hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component.html"),
            styles: [__webpack_require__(/*! ./evaluation-hr-detail.component.css */ "./src/app/hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["BsModalService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_hr_service__WEBPACK_IMPORTED_MODULE_3__["HrService"], _services_admin_service__WEBPACK_IMPORTED_MODULE_6__["AdminService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], EvaluationHrDetailComponent);
    return EvaluationHrDetailComponent;
}());



/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component.css":
/*!************************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component.html":
/*!*************************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h5 class=\"modal-title pull-left\">Modifier modèle d'évaluation</h5>\n  <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n\n<div class=\"modal-body\">\n  <form #evaluationFileForm=\"ngForm\" id=\"evaluationFileForm\">\n    <h6>Titre:</h6>\n    <input [readonly]=\"isReadOnly\" [(ngModel)]=\"evaluationFile.title\" name=\"title\" required type=\"text\" class=\"form-control input-sm\"\n      placeholder=\"Titre\" />\n\n    <h6>Année: </h6>\n    <input [readonly]=\"isReadOnly\" [(ngModel)]=\"evaluationFile.year\" name=\"year\" required min=\"2019\" max=\"2100\" type=\"number\"\n      class=\"form-control mb-1\" placeholder=\"Année\" />\n\n    <h6>Stratégie: </h6>\n    <select class=\"form-control mb-1\" id=\"strategy\" name=\"strategy\" required [(ngModel)]=\"evaluationFile.strategy.id\" [disabled]=\"isReadOnly\">\n      <option *ngFor=\"let strategy of strategyList\" [ngValue]=\"strategy.id\">\n        {{ strategy.title }}\n      </option>\n    </select>\n\n    <h6>Compétence comportementale:</h6>\n    <label class=\"ml-4 mr-3\" *ngFor=\"let bs of skillList\">\n      <input name=\"{{bs.skill}}\" type=\"checkbox\" class=\"form-check-input mr-6\" [value]=\"bs.id\" [checked]=\"bs.checked\" (change)=\"bs.checked = !bs.checked\"\n        [disabled]=\"isReadOnly\"> {{ bs.skill }}\n    </label>\n\n    <h6>Statut:</h6>\n    <select class=\"form-control mb-1\" style=\"width: 200px\" id=\"status\" name=\"status\" required [(ngModel)]=\"evaluationFile.status\">\n      <option *ngFor=\"let status of statusList\" [ngValue]=\"status\">\n        {{ status }}\n      </option>\n    </select>\n  </form>\n</div>\n\n<div *ngIf=\"showErrors\" class=\"alert alert-danger\" role=\"alert\">\n  Sélectionnez au moins une compétence comportementale.\n</div>\n\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"bsModalRef.hide()\">Annuler</button>\n  <button type=\"button\" class=\"btn btn-success\" (click)=\"updateEvaluationFile()\" form=\"evaluationFileForm\" [disabled]=\"!evaluationFileForm.valid\">Mettre à jour</button>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: EvaluationHrEditModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationHrEditModalComponent", function() { return EvaluationHrEditModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EvaluationHrEditModalComponent = /** @class */ (function () {
    function EvaluationHrEditModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.updateSelectedEvaluationFile = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    EvaluationHrEditModalComponent.prototype.ngOnInit = function () {
        if (this.evaluationFile.sealed) {
            this.isReadOnly = true;
            this.statusList = ['Publiée', 'Archivée'];
        }
    };
    EvaluationHrEditModalComponent.prototype.updateEvaluationFile = function () {
        this.showErrors = false;
        var selectedSkillIds = this.skillList.filter(function (s) { return s.checked === true; }).map(function (s) { return s.id; }).slice();
        if (selectedSkillIds.length > 0) {
            var evaluationFileToUpdate = {
                id: this.evaluationFile.id,
                title: this.evaluationFile.title,
                year: this.evaluationFile.year,
                strategyId: this.evaluationFile.strategy.id,
                behavioralSkillIds: selectedSkillIds,
                status: this.evaluationFile.status
            };
            this.updateSelectedEvaluationFile.emit(evaluationFileToUpdate);
            this.bsModalRef.hide();
        }
        else {
            this.showErrors = true;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluationHrEditModalComponent.prototype, "updateSelectedEvaluationFile", void 0);
    EvaluationHrEditModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-evaluation-hr-edit-modal',
            template: __webpack_require__(/*! ./evaluation-hr-edit-modal.component.html */ "./src/app/hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component.html"),
            styles: [__webpack_require__(/*! ./evaluation-hr-edit-modal.component.css */ "./src/app/hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"]])
    ], EvaluationHrEditModalComponent);
    return EvaluationHrEditModalComponent;
}());



/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-list/evaluation-hr-list.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-list/evaluation-hr-list.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-list/evaluation-hr-list.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-list/evaluation-hr-list.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div *ngIf=\"!creationMode\">\n    <app-hr-filter-create-actions [statusList]=\"statusList\" [dataType]=\"dataType\" (loadDataEvent)=\"handleLoadEvaluations($event)\"\n      (creationModeEvent)=\"handleCreationMode($event)\"></app-hr-filter-create-actions>\n\n    <br />\n\n    <div class=\"row\">\n      <table class=\"table table-hover\" style=\"cursor: pointer\">\n        <tr>\n          <th style=\"width: 30%\">Titre</th>\n          <th style=\"width: 10%\">Année</th>\n          <th style=\"width: 15%\">Statut</th>\n          <th style=\"width: 20%\">Auteur</th>\n          <th style=\"width: 15%\">Date de création</th>\n          <th style=\"width: 10%\"></th>\n        </tr>\n\n        <tr *ngFor=\"let evaluationFile of evaluationFiles\" [routerLink]=\"['/evaluationFiles', evaluationFile.id]\">\n          <td>{{evaluationFile.title}}</td>\n          <td>{{evaluationFile.year}}</td>\n          <td>{{evaluationFile.status}}</td>\n          <td>{{evaluationFile.ownerName}}</td>\n          <td>{{evaluationFile.created | date: 'mediumDate'}}</td>\n          <td>\n            <button *ngIf=\"evaluationFile.status !== 'Archivée'\" class=\"btn btn-info\" (click)=\"$event.stopPropagation()\" (click)=\"editEvaluationFileModal(evaluationFile)\">Editer</button>\n          </td>\n        </tr>\n\n      </table>\n    </div>\n  </div>\n\n  <div *ngIf=\"creationMode\">\n    <app-evaluation-hr-new (cancelCreation)=\"cancelCreationMode($event)\" (switchOffCreation)=\"switchOffCreationMode($event)\"></app-evaluation-hr-new>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-list/evaluation-hr-list.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-list/evaluation-hr-list.component.ts ***!
  \***********************************************************************************/
/*! exports provided: EvaluationHrListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationHrListComponent", function() { return EvaluationHrListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _evaluation_hr_edit_modal_evaluation_hr_edit_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../evaluation-hr-edit-modal/evaluation-hr-edit-modal.component */ "./src/app/hr/evaluations/evaluation-hr-edit-modal/evaluation-hr-edit-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EvaluationHrListComponent = /** @class */ (function () {
    function EvaluationHrListComponent(modalService) {
        this.modalService = modalService;
        this.loadEvaluationFilesEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.editEvaluationFileEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loadPublishedStratgeiesEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loadPublishedBehavioralSkillsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.filters = {};
        this.creationMode = false;
    }
    EvaluationHrListComponent.prototype.ngOnInit = function () {
        this.dataType = 'evaluationFile';
        this.loadEvaluationFilesEvent.emit(this.filters);
        this.loadPublishedBehavioralSkillsEvent.emit();
        this.loadPublishedStratgeiesEvent.emit();
    };
    EvaluationHrListComponent.prototype.resetFilters = function () {
        this.filters.status = '';
        this.loadEvaluationFilesEvent.emit(this.filters);
    };
    EvaluationHrListComponent.prototype.creationToggle = function () {
        this.creationMode = true;
    };
    EvaluationHrListComponent.prototype.cancelCreationMode = function (creationMode) {
        this.creationMode = creationMode;
    };
    EvaluationHrListComponent.prototype.switchOffCreationMode = function (reload) {
        this.creationMode = false;
        if (reload) {
            this.loadEvaluationFilesEvent.emit(this.filters);
        }
    };
    EvaluationHrListComponent.prototype.handleLoadEvaluations = function (event) {
        this.filters = event;
        this.loadEvaluationFilesEvent.emit(this.filters);
    };
    EvaluationHrListComponent.prototype.handleCreationMode = function (event) {
        this.creationMode = event;
    };
    EvaluationHrListComponent.prototype.editEvaluationFileModal = function (evaluationFile) {
        var _this = this;
        var initialState = {
            evaluationFile: evaluationFile,
            skillList: this.getSkillsArray(evaluationFile),
            strategyList: this.strategyList,
            statusList: this.statusList
        };
        this.bsModalRef = this.modalService.show(_evaluation_hr_edit_modal_evaluation_hr_edit_modal_component__WEBPACK_IMPORTED_MODULE_2__["EvaluationHrEditModalComponent"], { initialState: initialState });
        this.bsModalRef.content.updateSelectedEvaluationFile.subscribe(function (updatedEvaluationFile) {
            var updateParams = { updatedEvaluationFile: updatedEvaluationFile, filters: _this.filters };
            _this.editEvaluationFileEvent.emit(updateParams);
        });
    };
    EvaluationHrListComponent.prototype.getSkillsArray = function (evaluationFile) {
        var skills = [];
        var availableSkills = this.skillList.slice();
        for (var i = 0; i < availableSkills.length; i++) {
            var isMatch = false;
            for (var j = 0; j < evaluationFile.behavioralSkills.length; j++) {
                if (availableSkills[i].id === evaluationFile.behavioralSkills[j].id) {
                    isMatch = true;
                    availableSkills[i].checked = true;
                    skills.push(availableSkills[i]);
                    break;
                }
            }
            if (!isMatch) {
                availableSkills[i].checked = false;
                skills.push(availableSkills[i]);
            }
        }
        return skills;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], EvaluationHrListComponent.prototype, "statusList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], EvaluationHrListComponent.prototype, "evaluationFiles", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], EvaluationHrListComponent.prototype, "strategyList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], EvaluationHrListComponent.prototype, "skillList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluationHrListComponent.prototype, "loadEvaluationFilesEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluationHrListComponent.prototype, "editEvaluationFileEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluationHrListComponent.prototype, "loadPublishedStratgeiesEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluationHrListComponent.prototype, "loadPublishedBehavioralSkillsEvent", void 0);
    EvaluationHrListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-evaluation-hr-list',
            template: __webpack_require__(/*! ./evaluation-hr-list.component.html */ "./src/app/hr/evaluations/evaluation-hr-list/evaluation-hr-list.component.html"),
            styles: [__webpack_require__(/*! ./evaluation-hr-list.component.css */ "./src/app/hr/evaluations/evaluation-hr-list/evaluation-hr-list.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalService"]])
    ], EvaluationHrListComponent);
    return EvaluationHrListComponent;
}());



/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-new/evaluation-hr-new.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-new/evaluation-hr-new.component.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group>label {\n  display: inline-block;\n  vertical-align: middle;\n  width: 30em;\n}\n\n.form-group.required .control-label:after {\n  content: \"*\";\n  color: red;\n}\n"

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-new/evaluation-hr-new.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-new/evaluation-hr-new.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" d-flex justify-content-center>\n  <form [formGroup]=\"newForm\" (ngSubmit)=\"create()\">\n    <h2 class=\"ext-primary\">Création d'un modèle d'évaluation</h2>\n    <hr />\n    <div class=\"form-group row required\">\n      <label for=\"year\" class=\"col-sm-2 col-form-label control-label\">Année: </label>\n      <div class=\"col-sm-5\">\n        <input [ngClass]=\"{\n                          'is-invalid':\n                            newForm.get('year').errors &&\n                            newForm.get('year').touched\n                        }\" class=\"form-control mb-1\" placeholder=\"Année\" type=\"number\" min=\"2019\" max=\"2100\" formControlName=\"year\"\n        />\n      </div>\n      <div class=\"col-sm-5 invalid-feedback\" *ngIf=\"\n                          newForm.get('year').touched &&\n                          newForm.get('year').hasError('required')\n                        \">\n        L'année est requise\n      </div>\n    </div>\n\n    <div class=\"form-group row required\">\n      <label for=\"title\" class=\"col-sm-2 col-form-label control-label\">Titre: </label>\n      <div class=\"col-sm-5\">\n        <input [ngClass]=\"{\n                        'is-invalid':\n                          newForm.get('title').errors &&\n                          newForm.get('title').touched\n                      }\" class=\"form-control mb-1\" placeholder=\"Titre\" formControlName=\"title\" />\n      </div>\n      <div class=\"col-sm-5 invalid-feedback\" *ngIf=\"\n                        newForm.get('title').touched &&\n                        newForm.get('title').hasError('required')\n                      \">\n        Le titre est requis\n      </div>\n    </div>\n\n    <div class=\"form-group row required\">\n      <label for=\"strategy\" class=\"col-sm-2 col-form-label control-label\">Stratégie: </label>\n      <div class=\"col-sm-10\">\n        <select class=\"form-control mb-1\" id=\"strategy\" formControlName=\"strategy\">\n          <option *ngFor=\"let strategy of strategyList\" [ngValue]=\"strategy\">\n            {{ strategy.title }}\n          </option>\n        </select>\n      </div>\n    </div>\n\n    <div class=\"form-group row required\">\n      <label for=\"behavioralSkillId\" class=\"col-sm-12 col-form-label control-label\">Compétence comportementale: </label>\n    </div>\n    <div class=\"form-group row\">\n      <label class=\"ml-3\" formArrayName=\"skills\" *ngFor=\"let skill of newForm.get('skills')['controls']; let i = index\">\n        <input type=\"checkbox\" [formControlName]=\"i\"> {{skillsData[i].skill}}\n      </label>\n      <div class=\"invalid-feedback\" *ngIf=\"\n                        newForm.get('skills').touched &&\n                        newForm.get('skills').status !== 'INVALID'\n                      \">\n        La Compétence est requise\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <div class=\"col-sm-10 \">\n        <button class=\"btn btn-primary mr-2\" type=\"button\" (click)=\"cancel()\">\n          Annuler\n        </button>\n\n        <button class=\"btn btn-success\" type=\"submit\" [disabled]=\"!newForm.valid\">\n          Soumettre\n        </button>\n      </div>\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/evaluations/evaluation-hr-new/evaluation-hr-new.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/hr/evaluations/evaluation-hr-new/evaluation-hr-new.component.ts ***!
  \*********************************************************************************/
/*! exports provided: EvaluationHrNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationHrNewComponent", function() { return EvaluationHrNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EvaluationHrNewComponent = /** @class */ (function () {
    function EvaluationHrNewComponent(fb, hrService, authService, alertify) {
        this.fb = fb;
        this.hrService = hrService;
        this.authService = authService;
        this.alertify = alertify;
        this.cancelCreation = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.switchOffCreation = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loading = false;
    }
    EvaluationHrNewComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.loadPublishedStratgeies();
        this.loadPublishedBehavioralSkills();
    };
    EvaluationHrNewComponent.prototype.loadPublishedStratgeies = function () {
        var _this = this;
        this.loading = true;
        this.hrService.getPublishedStrategies().subscribe(function (result) {
            _this.loading = false;
            _this.strategyList = result.filter(function (r) { return r.sealed === false; });
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    EvaluationHrNewComponent.prototype.loadPublishedBehavioralSkills = function () {
        var _this = this;
        this.loading = true;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.hrService.getPublishedBehavioralSkills().subscribe(function (result) {
            _this.loading = false;
            _this.skillsData = result.filter(function (r) { return r.sealed === false; });
            ;
            _this.addCheckboxes();
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        }));
    };
    EvaluationHrNewComponent.prototype.createForm = function () {
        this.newForm = this.fb.group({
            title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            year: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            strategy: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            skills: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([], this.minSelectedCheckboxes(1))
        });
    };
    EvaluationHrNewComponent.prototype.create = function () {
        var _this = this;
        if (this.newForm.valid) {
            var selectedSkillIds = this.newForm.value.skills.map(function (v, i) { return v ? _this.skillsData[i].id : null; }).filter(function (v) { return v !== null; });
            var newEvaluationFile = { title: this.newForm.value.title, year: this.newForm.value.year, strategyId: this.newForm.value.strategy.id, behavioralSkillIds: selectedSkillIds };
            this.loading = true;
            this.hrService.createEvaluationFile(this.authService.decodedToken.nameid, newEvaluationFile).subscribe(function () {
                _this.loading = false;
                _this.alertify.success('Fiche d\'évaluation créé avec succèes');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            }, function () { _this.switchOffCreation.emit(true); });
        }
    };
    EvaluationHrNewComponent.prototype.cancel = function () {
        this.cancelCreation.emit(false);
    };
    EvaluationHrNewComponent.prototype.addCheckboxes = function () {
        var _this = this;
        this.skillsData.forEach(function (o, i) {
            var control = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](true);
            _this.newForm.get('skills').push(control);
        });
    };
    EvaluationHrNewComponent.prototype.minSelectedCheckboxes = function (min) {
        if (min === void 0) { min = 1; }
        var validator = function (formArray) {
            var totalSelected = formArray.controls
                .map(function (control) { return control.value; })
                .reduce(function (prev, next) { return next ? prev + next : prev; }, 0);
            // if the total is not greater than the minimum, return the error message
            return totalSelected >= min ? null : { required: true };
        };
        return validator;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluationHrNewComponent.prototype, "cancelCreation", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EvaluationHrNewComponent.prototype, "switchOffCreation", void 0);
    EvaluationHrNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-evaluation-hr-new',
            template: __webpack_require__(/*! ./evaluation-hr-new.component.html */ "./src/app/hr/evaluations/evaluation-hr-new/evaluation-hr-new.component.html"),
            styles: [__webpack_require__(/*! ./evaluation-hr-new.component.css */ "./src/app/hr/evaluations/evaluation-hr-new/evaluation-hr-new.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _services_hr_service__WEBPACK_IMPORTED_MODULE_3__["HrService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], EvaluationHrNewComponent);
    return EvaluationHrNewComponent;
}());



/***/ }),

/***/ "./src/app/hr/hr-filter-create-actions/hr-filter-create-actions.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/hr/hr-filter-create-actions/hr-filter-create-actions.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/hr-filter-create-actions/hr-filter-create-actions.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/hr/hr-filter-create-actions/hr-filter-create-actions.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form #form=\"ngForm\" (ngSubmit)=\"loadData()\" class=\"form-inline\" novalidate>\n  <div class=\"form-group\">\n    <label for=\"status\">Statut:</label>\n    <select [(ngModel)]=\"filters.status\" class=\"form-control\" style=\"width: 150px\" id=\"status\" name=\"status\">\n      <option value=\"\">Tous les statut</option>\n      <option *ngFor=\"let status of statusList\" [value]=\"status\">\n        {{ status }}\n      </option>\n    </select>\n  </div>\n\n  <button type=\"submit\" class=\"btn btn-primary\" style=\"margin-left:10px\">\n    Appliquer Filtre\n  </button>\n  <button type=\"button\" class=\"btn btn-info\" style=\"margin-left:10px\" (click)=\"resetFilters()\">\n    Réinitialiser Filtre\n  </button>\n\n  <div class=\"col\">\n    <div class=\"btn-group float-right\">\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"creationToggle()\">\n        {{labelButton}}\n      </button>\n    </div>\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/hr/hr-filter-create-actions/hr-filter-create-actions.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/hr/hr-filter-create-actions/hr-filter-create-actions.component.ts ***!
  \***********************************************************************************/
/*! exports provided: HrFilterCreateActionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HrFilterCreateActionsComponent", function() { return HrFilterCreateActionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HrFilterCreateActionsComponent = /** @class */ (function () {
    function HrFilterCreateActionsComponent() {
        this.loadDataEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.creationModeEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.filters = {};
    }
    HrFilterCreateActionsComponent.prototype.ngOnInit = function () {
        this.filters.status = '';
        this.filters.orderBy = 'created';
        switch (this.dataType) {
            case 'strategy':
                this.labelButton = 'Créer Nouvelle Stratégie';
                break;
            case 'behavioralSkill':
                this.labelButton = 'Créer Nouvelle compétence comportementale';
                break;
            case 'evaluationFile':
                this.labelButton = 'Créer Nouveau Modèle d\'Evaluation';
                break;
        }
    };
    HrFilterCreateActionsComponent.prototype.resetFilters = function () {
        this.filters.status = '';
        this.loadDataEvent.emit(this.filters);
    };
    HrFilterCreateActionsComponent.prototype.creationToggle = function () {
        this.creationModeEvent.emit(true);
    };
    HrFilterCreateActionsComponent.prototype.loadData = function () {
        this.loadDataEvent.emit(this.filters);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], HrFilterCreateActionsComponent.prototype, "dataType", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], HrFilterCreateActionsComponent.prototype, "statusList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], HrFilterCreateActionsComponent.prototype, "loadDataEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], HrFilterCreateActionsComponent.prototype, "creationModeEvent", void 0);
    HrFilterCreateActionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-hr-filter-create-actions',
            template: __webpack_require__(/*! ./hr-filter-create-actions.component.html */ "./src/app/hr/hr-filter-create-actions/hr-filter-create-actions.component.html"),
            styles: [__webpack_require__(/*! ./hr-filter-create-actions.component.css */ "./src/app/hr/hr-filter-create-actions/hr-filter-create-actions.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HrFilterCreateActionsComponent);
    return HrFilterCreateActionsComponent;
}());



/***/ }),

/***/ "./src/app/hr/hr-panel/hr-panel.component.css":
/*!****************************************************!*\
  !*** ./src/app/hr/hr-panel/hr-panel.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/hr-panel/hr-panel.component.html":
/*!*****************************************************!*\
  !*** ./src/app/hr/hr-panel/hr-panel.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n  <h2>Panneau de Ressource Humaine</h2>\n  <div class=\"tab-panel\">\n    <tabset class=\"hr-tabset\" #hrTabs>\n      <tab heading=\"Axes Stratégique\" *appHasRole=\"['HRD', 'HR']\">\n        <div class=\"container mt-2\">\n          <app-strategy-list [statusList]=\"statusList\" [strategies]=\"strategies\" [pagination]=\"pagination\" (pageChangedEvent)=\"(handlePageChanged($event))\"\n            (loadStrategiesEvent)=\"handleLoadStrategies($event)\" (editStrategyEvent)=\"handleEditStrategy($event)\">\n          </app-strategy-list>\n        </div>\n      </tab>\n\n      <tab heading=\"Compétences Comportementales\" *appHasRole=\"['HRD', 'HR']\">\n        <div class=\"container mt-2\">\n          <app-behavioral-skill-list [statusList]=\"statusList\" [behavioralSkills]=\"behavioralSkills\" (loadBehavioralSkillsEvent)=\"handleLoadBehavioralSkills($event)\"\n            (editBehavioralSkillEvent)=\"handleEditBehavioralSkill($event)\"></app-behavioral-skill-list>\n        </div>\n      </tab>\n\n      <tab heading=\"Modèle de fiches d'évaluation\" *appHasRole=\"['HRD', 'HR']\">\n        <div class=\"container mt-2\">\n          <app-evaluation-hr-list [statusList]=\"statusList\" [evaluationFiles]=\"evaluationFiles\" [strategyList]=\"strategyList\" [skillList]=\"skillList\"\n            (loadEvaluationFilesEvent)=\"handleLoadEvaluationFiles($event)\" (editEvaluationFileEvent)=\"handleEditEvaluationFile($event)\"\n            (loadPublishedStratgeiesEvent)=\"handleLoadPublishedStratgeies($event)\" (loadPublishedBehavioralSkillsEvent)=\"handleLoadPublishedBehavioralSkills($event)\"></app-evaluation-hr-list>\n        </div>\n      </tab>\n    </tabset>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/hr-panel/hr-panel.component.ts":
/*!***************************************************!*\
  !*** ./src/app/hr/hr-panel/hr-panel.component.ts ***!
  \***************************************************/
/*! exports provided: HrPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HrPanelComponent", function() { return HrPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HrPanelComponent = /** @class */ (function () {
    function HrPanelComponent(route, hrService, authService, alertify, router) {
        this.route = route;
        this.hrService = hrService;
        this.authService = authService;
        this.alertify = alertify;
        this.router = router;
        this.loading = false;
    }
    HrPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.strategies = data['strategies'].result;
            _this.pagination = data['strategies'].pagination;
        });
        this.statusList = ['Rédaction', 'En Revue', 'Publiée', 'Archivée'];
        //https://hackernoon.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
        Promise.resolve(null).then(function () {
            _this.route.queryParams.subscribe(function (params) {
                var selectedTab = params['tab'] || 0;
                _this.hrTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
            });
        });
    };
    HrPanelComponent.prototype.handleLoadStrategies = function (filters) {
        var _this = this;
        this.loading = true;
        this.hrService
            .getStrategies(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, filters)
            .subscribe(function (res) {
            _this.loading = false;
            _this.strategies = res.result;
            _this.pagination = res.pagination;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    HrPanelComponent.prototype.handleEditStrategy = function (event) {
        var _this = this;
        this.loading = true;
        this.hrService.updateStrategy(this.authService.decodedToken.nameid, event.updatedStrategy).subscribe(function () {
            _this.loading = false;
            _this.alertify.success('Stratégie a été mise à jour.');
            _this.handleLoadStrategies(event.filters);
        }, function (error) {
            _this.loading = false;
            _this.handleLoadStrategies(event.filters);
            _this.alertify.error(error);
        });
    };
    HrPanelComponent.prototype.handleLoadBehavioralSkills = function (filters) {
        var _this = this;
        this.loading = true;
        this.hrService
            .getBehavioralSkills(this.authService.decodedToken.nameid, filters)
            .subscribe(function (res) {
            _this.loading = false;
            _this.behavioralSkills = res;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    HrPanelComponent.prototype.handleEditBehavioralSkill = function (event) {
        var _this = this;
        this.loading = true;
        this.hrService.updateBehavioralSkill(this.authService.decodedToken.nameid, event.updatedBehavioralSkill).subscribe(function () {
            _this.loading = false;
            _this.alertify.success('Compétence comportementale a été mise à jour.');
            _this.handleLoadBehavioralSkills(event.filters);
        }, function (error) {
            _this.loading = false;
            _this.handleLoadBehavioralSkills(event.filters);
            _this.alertify.error(error);
        });
    };
    HrPanelComponent.prototype.handleLoadEvaluationFiles = function (filters) {
        var _this = this;
        this.loading = true;
        this.hrService
            .getEvaluationFiles(this.authService.decodedToken.nameid, filters)
            .subscribe(function (res) {
            _this.loading = false;
            _this.evaluationFiles = res;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    HrPanelComponent.prototype.handleEditEvaluationFile = function (event) {
        var _this = this;
        this.loading = true;
        this.hrService.updateEvaluationFile(this.authService.decodedToken.nameid, event.updatedEvaluationFile).subscribe(function () {
            _this.loading = false;
            _this.alertify.success('Fiche d\'évaluation a été mise à jour.');
            _this.handleLoadEvaluationFiles(event.filters);
            _this.handleLoadStrategies(event.filters);
            _this.handleLoadBehavioralSkills(event.filters);
        }, function (error) {
            _this.loading = false;
            _this.handleLoadEvaluationFiles(event.filters);
            _this.handleLoadStrategies(event.filters);
            _this.handleLoadBehavioralSkills(event.filters);
            _this.alertify.error(error);
        });
    };
    HrPanelComponent.prototype.handlePageChanged = function (event) {
        this.pagination.currentPage = event.currentPage;
        this.handleLoadStrategies(event.filters);
        ;
    };
    HrPanelComponent.prototype.handleLoadPublishedStratgeies = function () {
        var _this = this;
        this.loading = true;
        this.hrService.getPublishedStrategies().subscribe(function (result) {
            _this.loading = false;
            _this.strategyList = result;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    HrPanelComponent.prototype.handleLoadPublishedBehavioralSkills = function () {
        var _this = this;
        this.loading = true;
        this.hrService.getPublishedBehavioralSkills().subscribe(function (result) {
            _this.loading = false;
            _this.skillList = result;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('hrTabs'),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["TabsetComponent"])
    ], HrPanelComponent.prototype, "hrTabs", void 0);
    HrPanelComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-hr-panel',
            template: __webpack_require__(/*! ./hr-panel.component.html */ "./src/app/hr/hr-panel/hr-panel.component.html"),
            styles: [__webpack_require__(/*! ./hr-panel.component.css */ "./src/app/hr/hr-panel/hr-panel.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_hr_service__WEBPACK_IMPORTED_MODULE_3__["HrService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], HrPanelComponent);
    return HrPanelComponent;
}());



/***/ }),

/***/ "./src/app/hr/strategies/axis-modal/axis-modal.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/hr/strategies/axis-modal/axis-modal.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/strategies/axis-modal/axis-modal.component.html":
/*!********************************************************************!*\
  !*** ./src/app/hr/strategies/axis-modal/axis-modal.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title pull-left\">Modifier Axe {{axis.title}}</h4>\n  <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form #axisForm=\"ngForm\" id=\"axisForm\">\n    <div class=\"form-group\">\n      <input [(ngModel)]=\"axis.title\" name=\"title\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"Titre de l'axe stratigique\"\n      />\n    </div>\n    <div class=\"form-group\">\n      <textarea [(ngModel)]=\"axis.description\" name=\"description\" required rows=\"3\" class=\"form-control input-sm\" placeholder=\"Description de l'axe stratigique\"></textarea>\n    </div>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"bsModalRef.hide()\">Annuler</button>\n  <button type=\"button\" class=\"btn btn-success\" (click)=\"updateAxis()\" form=\"axisForm\" [disabled]=\"!axisForm.valid || !axisForm.dirty\">Mettre à jour</button>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/strategies/axis-modal/axis-modal.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/hr/strategies/axis-modal/axis-modal.component.ts ***!
  \******************************************************************/
/*! exports provided: AxisModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AxisModalComponent", function() { return AxisModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AxisModalComponent = /** @class */ (function () {
    function AxisModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.updateSelectedAxis = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    AxisModalComponent.prototype.ngOnInit = function () {
    };
    AxisModalComponent.prototype.updateAxis = function () {
        this.updateSelectedAxis.emit(this.axis);
        this.bsModalRef.hide();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AxisModalComponent.prototype, "updateSelectedAxis", void 0);
    AxisModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-axis-modal',
            template: __webpack_require__(/*! ./axis-modal.component.html */ "./src/app/hr/strategies/axis-modal/axis-modal.component.html"),
            styles: [__webpack_require__(/*! ./axis-modal.component.css */ "./src/app/hr/strategies/axis-modal/axis-modal.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"]])
    ], AxisModalComponent);
    return AxisModalComponent;
}());



/***/ }),

/***/ "./src/app/hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card text-center\" style=\"width: 10rem;\">\n  <div class=\"card-body\">\n    <h6 class=\"card-title text-center mb-1\">\n      {{axisPole.poleName}}\n    </h6>\n    <p *ngIf=\"!editing\" class=\"card-text text-muted text-center\">\n      {{axisPole.weight}}%\n    </p>\n    <div *ngIf=\"editing\" class=\"mb-2\">\n      <input type=\"number\" min=\"0\" max=\"100\" [value]=\"axisPole.weight\" (input)=\"onWeightChange(weight.value)\" #weight> %\n    </div>\n   <div *ngIf=\"!isReadOnly\">\n      <button class=\"btn\" [ngClass]=\"editing ? 'btn-success' : 'btn-info'\" (click)=\"toggleEdit()\">\n        <i *ngIf=\"editing\" class=\"fa fa-save\"></i>\n        <i *ngIf=\"!editing\" class=\"fa fa-edit\"></i>\n      </button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component.ts ***!
  \****************************************************************************************/
/*! exports provided: AxisPoleWeightItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AxisPoleWeightItemComponent", function() { return AxisPoleWeightItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AxisPoleWeightItemComponent = /** @class */ (function () {
    function AxisPoleWeightItemComponent() {
        this.updateWeightEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.editing = false;
    }
    AxisPoleWeightItemComponent.prototype.ngOnInit = function () {
    };
    AxisPoleWeightItemComponent.prototype.onWeightChange = function (value) {
        this.axisPole.weight = value;
    };
    AxisPoleWeightItemComponent.prototype.toggleEdit = function () {
        if (this.editing) {
            this.updateWeightEvent.emit(this.axisPole);
        }
        this.editing = !this.editing;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AxisPoleWeightItemComponent.prototype, "axisPole", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], AxisPoleWeightItemComponent.prototype, "isReadOnly", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AxisPoleWeightItemComponent.prototype, "updateWeightEvent", void 0);
    AxisPoleWeightItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-axis-pole-weight-item',
            template: __webpack_require__(/*! ./axis-pole-weight-item.component.html */ "./src/app/hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component.html"),
            styles: [__webpack_require__(/*! ./axis-pole-weight-item.component.css */ "./src/app/hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AxisPoleWeightItemComponent);
    return AxisPoleWeightItemComponent;
}());



/***/ }),

/***/ "./src/app/hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component.css":
/*!*********************************************************************************************!*\
  !*** ./src/app/hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),

/***/ "./src/app/hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component.html":
/*!**********************************************************************************************!*\
  !*** ./src/app/hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card mt-2 mb-2\">\n  <div class=\"card-header\">\n    {{axis.title}}\n  </div>\n\n  <div class=\"card-body\">\n    <ul class=\"list-inline member-icons animate text-center\">\n      <li class=\"list-inline-item\" *ngFor=\"let ap of axisPoleList\">\n        <app-axis-pole-weight-item [isReadOnly]=\"isReadOnly\" [axisPole]=\"ap\" (updateWeightEvent)=\"handleUpdateAxisPole($event)\"></app-axis-pole-weight-item>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component.ts ***!
  \********************************************************************************************/
/*! exports provided: AxisPolesWeightsCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AxisPolesWeightsCardComponent", function() { return AxisPolesWeightsCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AxisPolesWeightsCardComponent = /** @class */ (function () {
    function AxisPolesWeightsCardComponent(hrService, alertify) {
        this.hrService = hrService;
        this.alertify = alertify;
        this.loading = false;
    }
    AxisPolesWeightsCardComponent.prototype.ngOnInit = function () {
        this.loadAxisPoles();
    };
    AxisPolesWeightsCardComponent.prototype.loadAxisPoles = function () {
        var _this = this;
        this.loading = true;
        this.hrService.getAxisPoleList(this.axis.id).subscribe(function (result) {
            _this.loading = false;
            _this.axisPoleList = result;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    AxisPolesWeightsCardComponent.prototype.handleUpdateAxisPole = function (axisPole) {
        var _this = this;
        this.loading = true;
        this.hrService
            .updateAxisPoleWeigth(axisPole.axisId, axisPole.poleId, axisPole.weight)
            .subscribe(function (next) {
            _this.loading = false;
            _this.alertify.success('Mise à jour du pondération réussie');
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AxisPolesWeightsCardComponent.prototype, "axis", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], AxisPolesWeightsCardComponent.prototype, "isReadOnly", void 0);
    AxisPolesWeightsCardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-axis-poles-weights-card',
            template: __webpack_require__(/*! ./axis-poles-weights-card.component.html */ "./src/app/hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component.html"),
            styles: [__webpack_require__(/*! ./axis-poles-weights-card.component.css */ "./src/app/hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component.css")]
        }),
        __metadata("design:paramtypes", [_services_hr_service__WEBPACK_IMPORTED_MODULE_1__["HrService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"]])
    ], AxisPolesWeightsCardComponent);
    return AxisPolesWeightsCardComponent;
}());



/***/ }),

/***/ "./src/app/hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component.css":
/*!*********************************************************************************************!*\
  !*** ./src/app/hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".body {\n  overflow-y: scroll;\n  height: 500px;\n}\n"

/***/ }),

/***/ "./src/app/hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component.html":
/*!**********************************************************************************************!*\
  !*** ./src/app/hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-danger mt-3\" role=\"alert\" *ngIf=\"axisList?.length === 0\">\n  <p>Aucun axe n'a encore été ajouté...</p>\n</div>\n\n<div *ngIf=\"axisList?.length > 0\" class=\"row\" class=\"body\">\n  <div *ngFor=\"let axis of axisList\">\n    <app-axis-poles-weights-card [isReadOnly]=\"isReadOnly\" [axis]=\"axis\"></app-axis-poles-weights-card>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component.ts ***!
  \********************************************************************************************/
/*! exports provided: AxisPolesWeightsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AxisPolesWeightsListComponent", function() { return AxisPolesWeightsListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AxisPolesWeightsListComponent = /** @class */ (function () {
    function AxisPolesWeightsListComponent() {
    }
    AxisPolesWeightsListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], AxisPolesWeightsListComponent.prototype, "axisList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], AxisPolesWeightsListComponent.prototype, "isReadOnly", void 0);
    AxisPolesWeightsListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-axis-poles-weights-list',
            template: __webpack_require__(/*! ./axis-poles-weights-list.component.html */ "./src/app/hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component.html"),
            styles: [__webpack_require__(/*! ./axis-poles-weights-list.component.css */ "./src/app/hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AxisPolesWeightsListComponent);
    return AxisPolesWeightsListComponent;
}());



/***/ }),

/***/ "./src/app/hr/strategies/strategy-axis/strategy-axis.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-axis/strategy-axis.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n  border: none;\n}\n\n.axis {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.axis li {\n  margin-bottom: 10px;\n  padding-bottom: 10px;\n  border-bottom: 1px dotted #b3a9a9;\n}\n\n.card-body {\n  overflow-y: scroll;\n  height: 400px;\n}\n\n.form-group.required .control-label:after {\n  content: \"*\";\n  color: red;\n}\n"

/***/ }),

/***/ "./src/app/hr/strategies/strategy-axis/strategy-axis.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-axis/strategy-axis.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div *ngIf=\"!isReadOnly\" class=\"card-header\">\n    <form #axisForm=\"ngForm\" (ngSubmit)=\"axisForm.valid && addAxis()\">\n      <div class=\"form-group required\">\n        <label class='control-label'>Titre:</label>\n        <input [(ngModel)]=\"newAxis.title\" name=\"title\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"Titre de l'axe stratigique\"\n        />\n      </div>\n      <div class=\"form-group required\">\n        <label class='control-label'>Description:</label>\n        <textarea [(ngModel)]=\"newAxis.description\" name=\"description\" required rows=\"3\" class=\"form-control input-sm\" placeholder=\"Description de l'axe stratigique\"></textarea>\n      </div>\n\n      <button class=\"btn btn-primary\" [disabled]=\"!axisForm.valid\">\n        Ajouter\n      </button>\n    </form>\n  </div>\n\n  <div class=\"card-body\">\n    <div class=\"alert alert-danger mt-3\" role=\"alert\" *ngIf=\"axisList?.length === 0\">\n      <p>Aucun axe n'a encore été ajouté...</p>\n    </div>\n\n    <table *ngIf=\"axisList?.length > 0\" class=\"table table-hover\">\n      <tr>\n        <th style=\"width: 30%\">Titre</th>\n        <th style=\"width: 50%\">Description</th>\n        <th style=\"width: 10%\"></th>\n        <th style=\"width: 10%\"></th>\n      </tr>\n      <tr *ngFor=\"let axis of axisList\">\n        <td>{{ axis.title }}</td>\n        <td>{{ axis.description }}</td>\n        <td *ngIf=\"!isReadOnly\">\n          <button class=\"btn btn-info\" (click)=\"$event.stopPropagation()\" (click)=\"editAxisModal(axis)\">\n            <i class=\"fa fa-edit\"></i>\n          </button>\n        </td>\n        <td *ngIf=\"!isReadOnly\">\n          <button class=\"btn btn-danger\" (click)=\"$event.stopPropagation()\" (click)=\"deleteAxis(axis.id)\">\n            <i class=\"fa fa-trash\"></i>\n          </button>\n        </td>\n      </tr>\n    </table>\n  </div>\n"

/***/ }),

/***/ "./src/app/hr/strategies/strategy-axis/strategy-axis.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-axis/strategy-axis.component.ts ***!
  \************************************************************************/
/*! exports provided: StrategyAxisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyAxisComponent", function() { return StrategyAxisComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _axis_modal_axis_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../axis-modal/axis-modal.component */ "./src/app/hr/strategies/axis-modal/axis-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StrategyAxisComponent = /** @class */ (function () {
    function StrategyAxisComponent(hrService, authService, alertify, modalService) {
        this.hrService = hrService;
        this.authService = authService;
        this.alertify = alertify;
        this.modalService = modalService;
        this.addAxisEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.newAxis = {};
        this.loading = false;
    }
    StrategyAxisComponent.prototype.ngOnInit = function () {
    };
    StrategyAxisComponent.prototype.addAxis = function () {
        this.addAxisEvent.emit(this.newAxis);
        this.newAxis.title = '';
        this.newAxis.description = '';
    };
    StrategyAxisComponent.prototype.deleteAxis = function (id) {
        var _this = this;
        this.alertify.confirm('Etes-vous sur de vouloir supprimer cet axe?', function () {
            _this.loading = true;
            _this.hrService
                .deleteAxis(id, _this.authService.decodedToken.nameid)
                .subscribe(function () {
                _this.loading = false;
                _this.axisList.splice(_this.axisList.findIndex(function (a) { return a.id === id; }), 1);
                _this.alertify.success('L\'axe a été supprimé');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error('Impossible de supprimer l\'axe');
            });
        });
    };
    StrategyAxisComponent.prototype.editAxisModal = function (axis) {
        var _this = this;
        var initialState = {
            axis: axis
        };
        this.bsModalRef = this.modalService.show(_axis_modal_axis_modal_component__WEBPACK_IMPORTED_MODULE_5__["AxisModalComponent"], { initialState: initialState });
        this.bsModalRef.content.updateSelectedAxis.subscribe(function (updatedAxis) {
            _this.loading = true;
            _this.hrService.updateAxis(axis.id, updatedAxis).subscribe(function () {
                _this.loading = false;
                _this.alertify.success('L\'axe été mis à jour.');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], StrategyAxisComponent.prototype, "axisList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], StrategyAxisComponent.prototype, "isReadOnly", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], StrategyAxisComponent.prototype, "addAxisEvent", void 0);
    StrategyAxisComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-strategy-axis',
            template: __webpack_require__(/*! ./strategy-axis.component.html */ "./src/app/hr/strategies/strategy-axis/strategy-axis.component.html"),
            styles: [__webpack_require__(/*! ./strategy-axis.component.css */ "./src/app/hr/strategies/strategy-axis/strategy-axis.component.css")]
        }),
        __metadata("design:paramtypes", [_services_hr_service__WEBPACK_IMPORTED_MODULE_2__["HrService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalService"]])
    ], StrategyAxisComponent);
    return StrategyAxisComponent;
}());



/***/ }),

/***/ "./src/app/hr/strategies/strategy-detail/strategy-detail.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-detail/strategy-detail.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/strategies/strategy-detail/strategy-detail.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-detail/strategy-detail.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-4\">\n  <div class=\"row\">\n    <h1>Stratégie détail</h1>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div>\n            <strong>Titre:</strong>\n            <p>{{ strategy.title }}</p>\n          </div>\n          <div>\n            <strong>Description:</strong>\n            <p>{{ strategy.description }}</p>\n          </div>\n          <div>\n            <strong>Statut:</strong>\n            <p>{{ strategy.status }}</p>\n          </div>\n          <div *ngIf=\"strategy.sealed\">\n            <strong>Date scellée:</strong>\n            <p>{{ strategy.sealedDate | date: 'mediumDate' }}</p>\n          </div>\n          <div>\n            <strong>Auteur:</strong>\n            <p>{{ strategy.ownerName }}</p>\n          </div>\n          <div>\n            <strong>Créé:</strong>\n            <p>{{ strategy.created | date: 'mediumDate' }}</p>\n          </div>\n        </div>\n        <div class=\"card-footer\">\n          <div class=\"btn-group d-fles\">\n            <button class=\"btn btn-success w-80 mr-1\" [routerLink]=\"['/hr']\">\n              Retour au List\n            </button>\n            <button class=\"btn btn-secondary w-60 mr-1\" (click)=\"clone()\">\n              Coloner\n            </button>\n            <button class=\"btn btn-danger\" (click)=\"delete()\" *ngIf=\"!isReadOnly\">\n              <i class=\"fa fa-trash\"></i>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-8\">\n      <div class=\"tab-panel\">\n        <tabset class=\"strategy-tabset\" #strategyTabs>\n          <tab heading=\"Axes stratigique\">\n            <app-strategy-axis [isReadOnly]=\"isReadOnly\" [axisList]=\"axisList\" (addAxisEvent)=\"handleAddAxis(strategy.id, $event)\"></app-strategy-axis>\n          </tab>\n          <tab heading=\"Pôles et Pondération\">\n            <div class=\"container\">\n              <app-axis-poles-weights-list [isReadOnly]=\"isReadOnly\" [axisList]=\"axisList\"></app-axis-poles-weights-list>\n            </div>\n          </tab>\n          <tab heading=\"Documentation\">\n            <app-strategy-documentation [isReadOnly]=\"isReadOnly\" [strategy]=\"strategy\"></app-strategy-documentation>\n          </tab>\n        </tabset>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/strategies/strategy-detail/strategy-detail.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-detail/strategy-detail.component.ts ***!
  \****************************************************************************/
/*! exports provided: StrategyDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyDetailComponent", function() { return StrategyDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StrategyDetailComponent = /** @class */ (function () {
    function StrategyDetailComponent(hrService, authService, alertify, route, router) {
        this.hrService = hrService;
        this.authService = authService;
        this.alertify = alertify;
        this.route = route;
        this.router = router;
        this.loading = false;
    }
    StrategyDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.strategy = data['strategy'];
            _this.isReadOnly = _this.strategy.sealed;
        });
        this.loadAxisList(this.strategy.id);
    };
    StrategyDetailComponent.prototype.loadAxisList = function (strategyId) {
        var _this = this;
        this.loading = true;
        this.hrService.getAxisList(strategyId).subscribe(function (axises) {
            _this.loading = false;
            _this.axisList = axises;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    StrategyDetailComponent.prototype.handleAddAxis = function (strategyId, newAxis) {
        var _this = this;
        newAxis.strategyId = strategyId;
        this.loading = true;
        this.hrService
            .addAxis(newAxis)
            .subscribe(function (axis) {
            _this.loading = false;
            _this.axisList.unshift(axis);
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    StrategyDetailComponent.prototype.clone = function () {
        var _this = this;
        this.loading = true;
        this.hrService
            .cloneStrategy(this.authService.decodedToken.nameid, this.strategy.id)
            .subscribe(function () {
            _this.loading = false;
            _this.alertify.success('La stratégie a été clonée avec succès');
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        }, function () {
            _this.router.navigate(['/hr']);
        });
    };
    StrategyDetailComponent.prototype.delete = function () {
        var _this = this;
        this.alertify.confirm('Etes-vous sur de vouloir supprimer cette stratégie?', function () {
            _this.loading = true;
            _this.hrService.deleteStrategy(_this.strategy.id)
                .subscribe(function () {
                _this.loading = false;
                _this.alertify.success('La stratégie a été supprimée');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error('Impossible de supprimer la stratégie: ' + error);
            }, function () {
                _this.router.navigate(['/hr']);
            });
        });
    };
    StrategyDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-strategy-detail',
            template: __webpack_require__(/*! ./strategy-detail.component.html */ "./src/app/hr/strategies/strategy-detail/strategy-detail.component.html"),
            styles: [__webpack_require__(/*! ./strategy-detail.component.css */ "./src/app/hr/strategies/strategy-detail/strategy-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_services_hr_service__WEBPACK_IMPORTED_MODULE_2__["HrService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], StrategyDetailComponent);
    return StrategyDetailComponent;
}());



/***/ }),

/***/ "./src/app/hr/strategies/strategy-documentation/strategy-documentation.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-documentation/strategy-documentation.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),

/***/ "./src/app/hr/strategies/strategy-documentation/strategy-documentation.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-documentation/strategy-documentation.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <div class=\"card mt-2\" style=\"width: 30rem;\" *ngIf=\"strategy.documentationUrl\">\n    <a href=\"{{strategy.documentationUrl}}\" target=\"_blanc\" class=\"mt-2\">\n      <img src=\"../../../../assets/document.png\" alt=\"documentation\">\n    </a>\n    <div class=\"card-body\">\n      <h5 class=\"card-title\">Documentation détaillée sur la stratégie</h5>\n      <button *ngIf=\"!isReadOnly\" type=\"button\" class=\"btn btn-sm btn-danger\" (click)=\"deleteDocumentation(strategy.id)\">\n        <i class=\"fa fa-trash-o\"></i> Supprimer doucmentation\n      </button>\n    </div>\n  </div>\n\n  <div class=\"row mt-3\" *ngIf=\"!strategy.documentationUrl\">\n    <h5>Ajouter maximum 1 document</h5>\n    <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" />\n  </div>\n\n  <div class=\"row\" style=\"margin-bottom: 40px\" *ngIf=\"uploader?.queue?.length\">\n    <h3>File d'attente de téléchargement</h3>\n\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <th width=\"50%\">Nom</th>\n          <th>Taille</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let item of uploader.queue\">\n          <td>\n            <strong>{{ item?.file?.name }}</strong>\n          </td>\n          <td *ngIf=\"uploader.options.isHTML5\" nowrap>\n            {{ item?.file?.size / 1024 / 1024 | number: '.2' }} MB\n          </td>\n        </tr>\n      </tbody>\n    </table>\n\n    <div>\n      <div>\n        Progression de la file d'attente:\n        <div class=\"progress mb-4\">\n          <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ width: uploader.progress + '%' }\"></div>\n        </div>\n      </div>\n      <button type=\"button\" class=\"btn btn-success btn-s  mr-1\" (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n        <span class=\"fa fa-upload\"></span> Télécharger\n      </button>\n      <button type=\"button\" class=\"btn btn-warning btn-s  mr-1\" (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\">\n        <span class=\"fa fa-ban\"></span> Annuler\n      </button>\n      <button type=\"button\" class=\"btn btn-danger btn-s\" (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\n        <span class=\"fa fa-trash\"></span> Retirer\n      </button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/strategies/strategy-documentation/strategy-documentation.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-documentation/strategy-documentation.component.ts ***!
  \******************************************************************************************/
/*! exports provided: StrategyDocumentationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyDocumentationComponent", function() { return StrategyDocumentationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/hr.service */ "./src/app/_services/hr.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StrategyDocumentationComponent = /** @class */ (function () {
    function StrategyDocumentationComponent(alertifyService, hrService) {
        this.alertifyService = alertifyService;
        this.hrService = hrService;
        this.getMemberPhotoChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.hasBaseDropZoneOver = false;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl;
        this.loading = false;
    }
    StrategyDocumentationComponent.prototype.ngOnInit = function () {
        this.initializeUploader();
    };
    StrategyDocumentationComponent.prototype.initializeUploader = function () {
        var _this = this;
        this.uploader = new ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__["FileUploader"]({
            url: this.baseUrl +
                'hr/strategy/documentation/' +
                this.strategy.id,
            authToken: 'Bearer ' + localStorage.getItem('token'),
            isHTML5: true,
            allowedFileType: ['pdf'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024
        });
        this.uploader.onAfterAddingFile = function (file) {
            file.withCredentials = false;
        };
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            if (response) {
                var res = JSON.parse(response);
                _this.strategy.documentationUrl = res.documentationUrl;
            }
        };
        this.uploader.onErrorItem = function (item, response, status, headers) {
            _this.alertifyService.error(response);
        };
    };
    StrategyDocumentationComponent.prototype.deleteDocumentation = function (id) {
        var _this = this;
        this.alertifyService.confirm('Etes-vous sûr de vouloir supprimer ce document?', function () {
            _this.loading = true;
            _this.hrService
                .deleteStrategyDocument(id)
                .subscribe(function () {
                _this.loading = false;
                _this.strategy.documentationUrl = null;
                _this.alertifyService.success('Le document a été supprimée');
            }, function (error) {
                _this.loading = false;
                _this.alertifyService.error('Échec de la suppression de document.');
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], StrategyDocumentationComponent.prototype, "strategy", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], StrategyDocumentationComponent.prototype, "isReadOnly", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], StrategyDocumentationComponent.prototype, "getMemberPhotoChange", void 0);
    StrategyDocumentationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-strategy-documentation',
            template: __webpack_require__(/*! ./strategy-documentation.component.html */ "./src/app/hr/strategies/strategy-documentation/strategy-documentation.component.html"),
            styles: [__webpack_require__(/*! ./strategy-documentation.component.css */ "./src/app/hr/strategies/strategy-documentation/strategy-documentation.component.css")]
        }),
        __metadata("design:paramtypes", [_services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"], _services_hr_service__WEBPACK_IMPORTED_MODULE_4__["HrService"]])
    ], StrategyDocumentationComponent);
    return StrategyDocumentationComponent;
}());



/***/ }),

/***/ "./src/app/hr/strategies/strategy-edit-modal/strategy-edit-modal.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-edit-modal/strategy-edit-modal.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/strategies/strategy-edit-modal/strategy-edit-modal.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-edit-modal/strategy-edit-modal.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title pull-left\">Modifier Stratégie</h4>\n  <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form #strategyForm=\"ngForm\" id=\"strategyForm\">\n\n    <h4>Titre:</h4>\n    <input [readonly]=\"isReadOnly\" [(ngModel)]=\"strategy.title\" name=\"title\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"Ajouter un titre d'axe stratigique\"\n    />\n\n\n    <h4>Description:</h4>\n    <input [readonly]=\"isReadOnly\" [(ngModel)]=\"strategy.description\" name=\"description\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"Ajouter un axe stratigique\"\n    />\n\n\n    <h4>Statut:</h4>\n    <select class=\"form-control mb-1\" style=\"width: 200px\" id=\"status\" name=\"status\" [(ngModel)]=\"strategy.status\" required [disabled]=\"isReadOnly\" >\n      <option *ngFor=\"let status of statusList\" [ngValue]=\"status\">\n        {{ status }}\n      </option>\n    </select>\n\n\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"bsModalRef.hide()\">Annuler</button>\n  <button type=\"button\" class=\"btn btn-success\" (click)=\"updateStrategy()\" form=\"strategyForm\" [disabled]=\"!strategyForm.valid || !strategyForm.dirty\">Mettre à jour</button>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/strategies/strategy-edit-modal/strategy-edit-modal.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-edit-modal/strategy-edit-modal.component.ts ***!
  \************************************************************************************/
/*! exports provided: StrategyEditModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyEditModalComponent", function() { return StrategyEditModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StrategyEditModalComponent = /** @class */ (function () {
    function StrategyEditModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.updateSelectedStrategy = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    StrategyEditModalComponent.prototype.ngOnInit = function () {
        if (this.strategy.sealed) {
            this.isReadOnly = true;
        }
    };
    StrategyEditModalComponent.prototype.updateStrategy = function () {
        this.updateSelectedStrategy.emit(this.strategy);
        this.bsModalRef.hide();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], StrategyEditModalComponent.prototype, "updateSelectedStrategy", void 0);
    StrategyEditModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-strategy-edit-modal',
            template: __webpack_require__(/*! ./strategy-edit-modal.component.html */ "./src/app/hr/strategies/strategy-edit-modal/strategy-edit-modal.component.html"),
            styles: [__webpack_require__(/*! ./strategy-edit-modal.component.css */ "./src/app/hr/strategies/strategy-edit-modal/strategy-edit-modal.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"]])
    ], StrategyEditModalComponent);
    return StrategyEditModalComponent;
}());



/***/ }),

/***/ "./src/app/hr/strategies/strategy-list/strategy-list.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-list/strategy-list.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/hr/strategies/strategy-list/strategy-list.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-list/strategy-list.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div *ngIf=\"!creationMode\">\n    <app-hr-filter-create-actions [statusList]=\"statusList\" [dataType]=\"dataType\" (loadDataEvent)=\"handleLoadStrategies($event)\"\n      (creationModeEvent)=\"handleCreationMode($event)\"></app-hr-filter-create-actions>\n\n    <br />\n\n    <div class=\"row\">\n      <table class=\"table table-hover\" style=\"cursor: pointer\">\n        <tr>\n          <th style=\"width: 30%\">Titre</th>\n          <th style=\"width: 15%\">Statut</th>\n          <th style=\"width: 20%\">Auteur</th>\n          <th style=\"width: 15%\">Date de création</th>\n          <th style=\"width: 20%\"></th>\n        </tr>\n\n        <tr *ngFor=\"let strategy of strategies\" [routerLink]=\"['/strategies', strategy.id]\">\n          <td>{{strategy.title}}</td>\n          <td>{{strategy.status}}</td>\n          <td>{{strategy.ownerName}}</td>\n          <td>{{strategy.created | date: 'mediumDate'}}</td>\n          <td>\n            <button *ngIf=\"strategy.status !== 'Archivée'\" class=\"btn btn-info\" (click)=\"$event.stopPropagation()\" (click)=\"editStrategyModal(strategy)\">Editer</button>\n          </td>\n        </tr>\n\n      </table>\n    </div>\n\n    <div class=\"d-flex justify-content-center\">\n      <pagination [boundaryLinks]=\"true\" [totalItems]=\"pagination.totalItems\" [itemsPerPage]=\"pagination.itemsPerPage\" [(ngModel)]=\"pagination.currentPage\"\n        previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\" (pageChanged)=\"pageChanged($event)\">\n      </pagination>\n    </div>\n  </div>\n\n  <div *ngIf=\"creationMode\">\n    <app-strategy-new (cancelCreation)=\"cancelCreationMode($event)\" (switchOffCreation)=\"switchOffCreationMode($event)\"></app-strategy-new>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/hr/strategies/strategy-list/strategy-list.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-list/strategy-list.component.ts ***!
  \************************************************************************/
/*! exports provided: StrategyListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyListComponent", function() { return StrategyListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _strategy_edit_modal_strategy_edit_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../strategy-edit-modal/strategy-edit-modal.component */ "./src/app/hr/strategies/strategy-edit-modal/strategy-edit-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StrategyListComponent = /** @class */ (function () {
    function StrategyListComponent(modalService) {
        this.modalService = modalService;
        this.loadStrategiesEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.editStrategyEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pageChangedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.creationMode = false;
        this.filters = {};
    }
    StrategyListComponent.prototype.ngOnInit = function () {
        this.dataType = 'strategy';
    };
    StrategyListComponent.prototype.pageChanged = function (event) {
        var pageParams = { currentPage: event.page, filters: this.filters };
        this.pageChangedEvent.emit(pageParams);
        ;
    };
    StrategyListComponent.prototype.cancelCreationMode = function (creationMode) {
        this.creationMode = creationMode;
    };
    StrategyListComponent.prototype.switchOffCreationMode = function (reload) {
        this.creationMode = false;
        if (reload) {
            this.loadStrategiesEvent.emit(this.filters);
        }
    };
    StrategyListComponent.prototype.handleLoadStrategies = function (event) {
        this.filters = event;
        this.loadStrategiesEvent.emit(this.filters);
    };
    StrategyListComponent.prototype.handleCreationMode = function (event) {
        this.creationMode = event;
    };
    StrategyListComponent.prototype.editStrategyModal = function (strategy) {
        var _this = this;
        var initialState = {
            strategy: strategy,
            statusList: this.statusList
        };
        this.bsModalRef = this.modalService.show(_strategy_edit_modal_strategy_edit_modal_component__WEBPACK_IMPORTED_MODULE_2__["StrategyEditModalComponent"], { initialState: initialState });
        this.bsModalRef.content.updateSelectedStrategy.subscribe(function (updatedStrategy) {
            var updateParams = { updatedStrategy: updatedStrategy, filters: _this.filters };
            _this.editStrategyEvent.emit(updateParams);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], StrategyListComponent.prototype, "strategies", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], StrategyListComponent.prototype, "pagination", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], StrategyListComponent.prototype, "statusList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], StrategyListComponent.prototype, "loadStrategiesEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], StrategyListComponent.prototype, "editStrategyEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], StrategyListComponent.prototype, "pageChangedEvent", void 0);
    StrategyListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-strategy-list',
            template: __webpack_require__(/*! ./strategy-list.component.html */ "./src/app/hr/strategies/strategy-list/strategy-list.component.html"),
            styles: [__webpack_require__(/*! ./strategy-list.component.css */ "./src/app/hr/strategies/strategy-list/strategy-list.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalService"]])
    ], StrategyListComponent);
    return StrategyListComponent;
}());



/***/ }),

/***/ "./src/app/hr/strategies/strategy-new/strategy-new.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-new/strategy-new.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group>label {\n  display: inline-block;\n  vertical-align: middle;\n  width: 12em;\n}\n\n.form-group.required .control-label:after {\n  content: \"*\";\n  color: red;\n}\n"

/***/ }),

/***/ "./src/app/hr/strategies/strategy-new/strategy-new.component.html":
/*!************************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-new/strategy-new.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" d-flex justify-content-center>\n  <div class=\"col-sm-6 offset-sm-3 text-center\">\n    <h2 class=\"ext-primary\">Création d'une stratégie</h2>\n    <hr />\n    <form [formGroup]=\"newForm\" class=\"form-inline\" (ngSubmit)=\"create()\">\n      <div class=\"form-group  required\">\n        <label class='control-label' for=\"title\">Titre: </label>\n        <input [ngClass]=\"{\n                        'is-invalid':\n                          newForm.get('title').errors &&\n                          newForm.get('title').touched\n                      }\" class=\"form-control mb-1\" placeholder=\"Titre\" formControlName=\"title\" />\n        <div class=\"invalid-feedback\" *ngIf=\"\n                        newForm.get('title').touched &&\n                        newForm.get('title').hasError('required')\n                      \">\n          Le titre est requis\n        </div>\n      </div>\n\n      <div class=\"form-group  required\">\n        <label class='control-label' for=\"description\">Description: </label>\n        <textarea formControlName=\"description\" rows=\"4\" cols=\"50\" [ngClass]=\"{\n                              'is-invalid':\n                                newForm.get('description').errors &&\n                                newForm.get('description').touched\n                            }\" class=\"form-control mb-1\" placeholder=\"Description\"></textarea>\n        <div class=\"invalid-feedback\" *ngIf=\"\n                      newForm.get('description').touched &&\n                      newForm.get('description').hasError('required')\n                    \">\n          La description est requise\n        </div>\n      </div>\n\n      <div class=\"form-group mt-2\">\n        <button class=\"btn btn-primary mr-2\" type=\"button\" (click)=\"cancel()\">\n          Annuler\n        </button>\n        <button class=\"btn btn-success\" type=\"submit\" [disabled]=\"!newForm.valid\">\n          Soumettre\n        </button>\n      </div>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/hr/strategies/strategy-new/strategy-new.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/hr/strategies/strategy-new/strategy-new.component.ts ***!
  \**********************************************************************/
/*! exports provided: StrategyNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyNewComponent", function() { return StrategyNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_hr_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/hr.service */ "./src/app/_services/hr.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StrategyNewComponent = /** @class */ (function () {
    function StrategyNewComponent(fb, hrService, authService, alertify) {
        this.fb = fb;
        this.hrService = hrService;
        this.authService = authService;
        this.alertify = alertify;
        this.cancelCreation = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.switchOffCreation = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loading = false;
    }
    StrategyNewComponent.prototype.ngOnInit = function () {
        this.createForm();
    };
    StrategyNewComponent.prototype.createForm = function () {
        this.newForm = this.fb.group({
            title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
        });
    };
    StrategyNewComponent.prototype.create = function () {
        var _this = this;
        if (this.newForm.valid) {
            this.newStrategy = Object.assign({}, this.newForm.value);
            this.loading = true;
            this.hrService.createStrategy(this.authService.decodedToken.nameid, this.newStrategy).subscribe(function () {
                _this.loading = false;
                _this.alertify.success('Stratégie créé avec succèes');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            }, function () { _this.switchOffCreation.emit(true); });
        }
    };
    StrategyNewComponent.prototype.cancel = function () {
        this.cancelCreation.emit(false);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], StrategyNewComponent.prototype, "cancelCreation", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], StrategyNewComponent.prototype, "switchOffCreation", void 0);
    StrategyNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-strategy-new',
            template: __webpack_require__(/*! ./strategy-new.component.html */ "./src/app/hr/strategies/strategy-new/strategy-new.component.html"),
            styles: [__webpack_require__(/*! ./strategy-new.component.css */ "./src/app/hr/strategies/strategy-new/strategy-new.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _services_hr_service__WEBPACK_IMPORTED_MODULE_3__["HrService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"]])
    ], StrategyNewComponent);
    return StrategyNewComponent;
}());



/***/ }),

/***/ "./src/app/messages/messages.component.css":
/*!*************************************************!*\
  !*** ./src/app/messages/messages.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  margin-top: 15px;\n}\n\n.img-circle {\n  max-height: 50px;\n}\n\ntd {\n  vertical-align: middle;\n}\n"

/***/ }),

/***/ "./src/app/messages/messages.component.html":
/*!**************************************************!*\
  !*** ./src/app/messages/messages.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n  <div class=\"row\">\n    <div class=\"btn-group\">\n      <button class=\"btn btn-primary\" [(ngModel)]=\"messageContainer\" btnRadio=\"Unread\" (click)=\"loadMessages()\">\n        <i class=\"fa fa-envelope\"></i> No lu\n      </button>\n      <button class=\"btn btn-primary\" [(ngModel)]=\"messageContainer\" btnRadio=\"Inbox\" (click)=\"loadMessages()\">\n        <i class=\"fa fa-envelope-open\"></i> Boîte de réception\n      </button>\n      <button class=\"btn btn-primary\" [(ngModel)]=\"messageContainer\" btnRadio=\"Outbox\" (click)=\"loadMessages()\">\n        <i class=\"fa fa-paper-plane\"></i> Boîte d'envoi\n      </button>\n    </div>\n  </div>\n\n  <div class=\"row\" *ngIf=\"messages.length == 0\">\n    <h3>Pas de messages</h3>\n  </div>\n\n  <div class=\"row\" *ngIf=\"messages.length > 0\">\n    <table class=\"table table-hover\" style=\"cursor: pointer\">\n      <tr>\n        <th style=\"width: 40%\">Message</th>\n        <th style=\"width: 20%\">De / A</th>\n        <th style=\"width: 20%\">Envoyé / reçu</th>\n        <th style=\"width: 20%\"></th>\n      </tr>\n      <tr *ngFor=\"let message of messages\" [routerLink]=\"[\n          '/admin/collaborators',\n          messageContainer == 'Outbox' ? message.recipientId : message.senderId\n        ]\" [queryParams]=\"{ tab: 3 }\">\n        <td>{{ message.content }}</td>\n        <td>\n          <div *ngIf=\"messageContainer != 'Outbox'\">\n            <img src=\"{{ message?.senderPhotoUrl }}\" class=\"img-circle rounded-circle mr-1\" />\n            <strong>{{ message.senderKnownAs }}</strong>\n          </div>\n          <div *ngIf=\"messageContainer == 'Outbox'\">\n            <img src=\"{{ message?.recipientPhotoUrl }}\" class=\"img-circle rounded-circle m-1\" />\n            <strong>{{ message.recipientKnownAs }}</strong>\n          </div>\n        </td>\n        <td>{{ message.messageSent | timeAgo }}</td>\n        <td>\n          <button class=\"btn btn-danger\" (click)=\"$event.stopPropagation()\" (click)=\"deleteMessage(message.id)\">\n            Supprimer\n          </button>\n        </td>\n      </tr>\n    </table>\n  </div>\n</div>\n\n<div class=\"d-flex justify-content-center\">\n  <pagination [boundaryLinks]=\"true\" [totalItems]=\"pagination.totalItems\" [itemsPerPage]=\"pagination.itemsPerPage\" [(ngModel)]=\"pagination.currentPage\"\n    (pageChanged)=\"pageChanged($event)\" previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\">\n  </pagination>\n</div>\n"

/***/ }),

/***/ "./src/app/messages/messages.component.ts":
/*!************************************************!*\
  !*** ./src/app/messages/messages.component.ts ***!
  \************************************************/
/*! exports provided: MessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesComponent", function() { return MessagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(userService, authService, route, alertify) {
        this.userService = userService;
        this.authService = authService;
        this.route = route;
        this.alertify = alertify;
        this.messageContainer = 'Unread';
        this.loading = false;
    }
    MessagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.messages = data['messages'].result;
            _this.pagination = data['messages'].pagination;
        });
    };
    MessagesComponent.prototype.loadMessages = function () {
        var _this = this;
        this.loading = true;
        this.userService
            .getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
            .subscribe(function (res) {
            _this.loading = false;
            _this.messages = res.result;
            _this.pagination = res.pagination;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    MessagesComponent.prototype.deleteMessage = function (id) {
        var _this = this;
        this.alertify.confirm('Etes-vous sur de vouloir supprimer ce message', function () {
            _this.loading = true;
            _this.userService
                .deleteMessage(id, _this.authService.decodedToken.nameid)
                .subscribe(function () {
                _this.loading = false;
                _this.messages.splice(_this.messages.findIndex(function (m) { return m.id === id; }), 1);
                _this.alertify.success('Le message a été supprimé');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error('Impossible de supprimer le message');
            });
        });
    };
    MessagesComponent.prototype.pageChanged = function (event) {
        this.pagination.currentPage = event.page;
        this.loadMessages();
    };
    MessagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-messages',
            template: __webpack_require__(/*! ./messages.component.html */ "./src/app/messages/messages.component.html"),
            styles: [__webpack_require__(/*! ./messages.component.css */ "./src/app/messages/messages.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"]])
    ], MessagesComponent);
    return MessagesComponent;
}());



/***/ }),

/***/ "./src/app/nav/nav.component.css":
/*!***************************************!*\
  !*** ./src/app/nav/nav.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dropdown-toggle,\n.dropdown-item {\n  cursor: pointer;\n}\n\nimg {\n  max-width: 50px;\n  border: 2px solid white;\n  display: inline;\n}\n"

/***/ }),

/***/ "./src/app/nav/nav.component.html":
/*!****************************************!*\
  !*** ./src/app/nav/nav.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-md navbar-dark bg-primary\">\n  <div class=\"container\">\n    <a class=\"navbar-brand\" [routerLink]=\"['/home']\">Goal Management</a>\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\"\n      aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n      <span class=\"navbar-toggler-icon\"></span>\n    </button>\n\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n      <ul *ngIf=\"loggedIn()\" class=\"navbar-nav mr-auto\">\n        <li class=\"nav-item\" routerLinkActive=\"active\">\n          <a class=\"nav-link\" [routerLink]=\"['/strategies']\">Stratégies</a>\n        </li>\n\n        <li class=\"nav-item\" routerLinkActive=\"active\">\n          <a class=\"nav-link\" [routerLink]=\"['/sheets']\">Fiches d'évaluation</a>\n        </li>\n\n        <li class=\"nav-item\" routerLinkActive=\"active\">\n          <a class=\"nav-link\" [routerLink]=\"['/messages']\">Messages</a>\n        </li>\n        <li class=\"nav-item\" routerLinkActive=\"active\" *appHasRole=\"['HR', 'HRD']\">\n          <a class=\"nav-link\" [routerLink]=\"['/hr']\">Ressources Humaines</a>\n        </li>\n\n        <li class=\"nav-item\" routerLinkActive=\"active\" *appHasRole=\"['Admin', 'HR']\">\n          <a class=\"nav-link\" [routerLink]=\"['/admin']\">Administration</a>\n        </li>\n      </ul>\n\n      <div *ngIf=\"loggedIn()\" class=\"dropdown\" dropdown>\n        <span class=\"mr-1\">\n          <img src=\"{{ photoUrl || '../../assets/user.png' }}\" alt=\"\" />\n        </span>\n        <a class=\"dropdown-toggle text-light\" dropdownToggle>\n          Bienvenue {{ authService.currentUser?.firstName }}\n        </a>\n\n        <div class=\"dropdown-menu mt-3\" *dropdownMenu>\n          <a class=\"dropdown-item\" [routerLink]=\"['/profile/edit']\">\n            <i class=\"fa fa-user\"></i>Editer le profil</a>\n          <div class=\"dropdown-divider\"></div>\n          <a class=\"dropdown-item\" [routerLink]=\"['/requestResetPassword']\">\n            <i class=\"fa fa-key fa-fw\"></i>Changer password</a>\n          <div class=\"dropdown-divider\"></div>\n          <a class=\"dropdown-item\" (click)=\"logout()\">\n            <i class=\"fa fa-sign-out\"></i>Déconnecter</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/nav/nav.component.ts":
/*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavComponent = /** @class */ (function () {
    function NavComponent(authService, alertify, router) {
        this.authService = authService;
        this.alertify = alertify;
        this.router = router;
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.currentPhotoUrl.subscribe(function (photoUrl) { return (_this.photoUrl = photoUrl); });
    };
    NavComponent.prototype.loggedIn = function () {
        return this.authService.loggedIn();
    };
    NavComponent.prototype.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.authService.decodedToken = null;
        this.authService.currentUser = null;
        this.alertify.message('Déconnecté');
        this.router.navigate(['/home']);
    };
    NavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-nav',
            template: __webpack_require__(/*! ./nav.component.html */ "./src/app/nav/nav.component.html"),
            styles: [__webpack_require__(/*! ./nav.component.css */ "./src/app/nav/nav.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "./src/app/routes.ts":
/*!***************************!*\
  !*** ./src/app/routes.ts ***!
  \***************************/
/*! exports provided: appRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutes", function() { return appRoutes; });
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messages/messages.component */ "./src/app/messages/messages.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony import */ var _collaborators_collaborator_edit_collaborator_edit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./collaborators/collaborator-edit/collaborator-edit.component */ "./src/app/collaborators/collaborator-edit/collaborator-edit.component.ts");
/* harmony import */ var _guards_prevent_unsave_changes_guards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_guards/prevent-unsave-changes-guards */ "./src/app/_guards/prevent-unsave-changes-guards.ts");
/* harmony import */ var _resolvers_messages_resolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_resolvers/messages.resolver */ "./src/app/_resolvers/messages.resolver.ts");
/* harmony import */ var _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin/admin-panel/admin-panel.component */ "./src/app/admin/admin-panel/admin-panel.component.ts");
/* harmony import */ var _hr_hr_panel_hr_panel_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hr/hr-panel/hr-panel.component */ "./src/app/hr/hr-panel/hr-panel.component.ts");
/* harmony import */ var _strategies_strategies_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./strategies/strategies.component */ "./src/app/strategies/strategies.component.ts");
/* harmony import */ var _resolvers_strategies_resolver__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_resolvers/strategies.resolver */ "./src/app/_resolvers/strategies.resolver.ts");
/* harmony import */ var _resolvers_collaborator_list_resolver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_resolvers/collaborator-list.resolver */ "./src/app/_resolvers/collaborator-list.resolver.ts");
/* harmony import */ var _resolvers_collaborator_detail_resolver___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_resolvers/collaborator-detail.resolver. */ "./src/app/_resolvers/collaborator-detail.resolver..ts");
/* harmony import */ var _collaborators_collaborator_detail_collaborator_detail_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./collaborators/collaborator-detail/collaborator-detail.component */ "./src/app/collaborators/collaborator-detail/collaborator-detail.component.ts");
/* harmony import */ var _resolvers_strategy_list_resolver__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_resolvers/strategy-list.resolver */ "./src/app/_resolvers/strategy-list.resolver.ts");
/* harmony import */ var _hr_strategies_strategy_detail_strategy_detail_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./hr/strategies/strategy-detail/strategy-detail.component */ "./src/app/hr/strategies/strategy-detail/strategy-detail.component.ts");
/* harmony import */ var _resolvers_strategy_detail_resolver__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./_resolvers/strategy-detail.resolver */ "./src/app/_resolvers/strategy-detail.resolver.ts");
/* harmony import */ var _collaborators_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./collaborators/reset-password/reset-password.component */ "./src/app/collaborators/reset-password/reset-password.component.ts");
/* harmony import */ var _collaborators_forget_password_forget_password_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./collaborators/forget-password/forget-password.component */ "./src/app/collaborators/forget-password/forget-password.component.ts");
/* harmony import */ var _collaborators_profile_edit_profile_edit_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./collaborators/profile-edit/profile-edit.component */ "./src/app/collaborators/profile-edit/profile-edit.component.ts");
/* harmony import */ var _resolvers_profile_edit_resolver__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./_resolvers/profile-edit.resolver */ "./src/app/_resolvers/profile-edit.resolver.ts");
/* harmony import */ var _hr_behavioral_skills_behavioral_skill_detail_behavioral_skill_detail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component */ "./src/app/hr/behavioral-skills/behavioral-skill-detail/behavioral-skill-detail.component.ts");
/* harmony import */ var _resolvers_behavioral_skill_detail_resolver___WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./_resolvers/behavioral-skill-detail.resolver. */ "./src/app/_resolvers/behavioral-skill-detail.resolver..ts");
/* harmony import */ var _hr_evaluations_evaluation_hr_detail_evaluation_hr_detail_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component */ "./src/app/hr/evaluations/evaluation-hr-detail/evaluation-hr-detail.component.ts");
/* harmony import */ var _resolvers_evaluation_hr_detail_resolver__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./_resolvers/evaluation-hr-detail.resolver */ "./src/app/_resolvers/evaluation-hr-detail.resolver.ts");
/* harmony import */ var _sheets_sheets_panel_sheets_panel_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./sheets/sheets-panel/sheets-panel.component */ "./src/app/sheets/sheets-panel/sheets-panel.component.ts");
/* harmony import */ var _resolvers_sheets_resolver__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./_resolvers/sheets.resolver */ "./src/app/_resolvers/sheets.resolver.ts");
/* harmony import */ var _sheets_sheet_detail_sheet_detail_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./sheets/sheet-detail/sheet-detail.component */ "./src/app/sheets/sheet-detail/sheet-detail.component.ts");
/* harmony import */ var _resolvers_sheet_detail_resolver__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./_resolvers/sheet-detail.resolver */ "./src/app/_resolvers/sheet-detail.resolver.ts");




























var appRoutes = [
    {
        path: '',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__["HomeComponent"]
    },
    {
        path: 'resetPassword',
        component: _collaborators_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_16__["ResetPasswordComponent"]
    },
    {
        path: 'requestResetPassword',
        component: _collaborators_forget_password_forget_password_component__WEBPACK_IMPORTED_MODULE_17__["ForgetPasswordComponent"]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        children: [
            {
                path: 'profile/edit',
                component: _collaborators_profile_edit_profile_edit_component__WEBPACK_IMPORTED_MODULE_18__["ProfileEditComponent"],
                resolve: { user: _resolvers_profile_edit_resolver__WEBPACK_IMPORTED_MODULE_19__["ProfileEditResolver"] },
                canDeactivate: [_guards_prevent_unsave_changes_guards__WEBPACK_IMPORTED_MODULE_4__["PreventUnsavedChanges"]]
            },
            {
                path: 'sheets',
                component: _sheets_sheets_panel_sheets_panel_component__WEBPACK_IMPORTED_MODULE_24__["SheetsPanelComponent"],
                resolve: { sheets: _resolvers_sheets_resolver__WEBPACK_IMPORTED_MODULE_25__["SheetsResolver"] }
            }, {
                path: 'sheets/:id',
                component: _sheets_sheet_detail_sheet_detail_component__WEBPACK_IMPORTED_MODULE_26__["SheetDetailComponent"],
                resolve: { resolvedData: _resolvers_sheet_detail_resolver__WEBPACK_IMPORTED_MODULE_27__["SheetDetailResolver"] }
            },
            {
                path: 'strategies',
                component: _strategies_strategies_component__WEBPACK_IMPORTED_MODULE_8__["StrategiesComponent"],
                resolve: { strategies: _resolvers_strategies_resolver__WEBPACK_IMPORTED_MODULE_9__["StrategiesResolver"] }
            }, {
                path: 'strategies/:id',
                component: _hr_strategies_strategy_detail_strategy_detail_component__WEBPACK_IMPORTED_MODULE_14__["StrategyDetailComponent"],
                resolve: { strategy: _resolvers_strategy_detail_resolver__WEBPACK_IMPORTED_MODULE_15__["StrategyDetailResolver"] }
            }, {
                path: 'behavioralSkills/:id',
                component: _hr_behavioral_skills_behavioral_skill_detail_behavioral_skill_detail_component__WEBPACK_IMPORTED_MODULE_20__["BehavioralSkillDetailComponent"],
                resolve: { behavioralSkill: _resolvers_behavioral_skill_detail_resolver___WEBPACK_IMPORTED_MODULE_21__["BehavioralSkillDetailResolver"] }
            },
            {
                path: 'evaluationFiles/:id',
                component: _hr_evaluations_evaluation_hr_detail_evaluation_hr_detail_component__WEBPACK_IMPORTED_MODULE_22__["EvaluationHrDetailComponent"],
                resolve: { evaluationFile: _resolvers_evaluation_hr_detail_resolver__WEBPACK_IMPORTED_MODULE_23__["EvaluationHrDetailResolver"] }
            },
            {
                path: 'messages',
                component: _messages_messages_component__WEBPACK_IMPORTED_MODULE_1__["MessagesComponent"],
                resolve: { messages: _resolvers_messages_resolver__WEBPACK_IMPORTED_MODULE_5__["MessagesResolver"] }
            },
            {
                path: 'hr',
                component: _hr_hr_panel_hr_panel_component__WEBPACK_IMPORTED_MODULE_7__["HrPanelComponent"],
                resolve: { strategies: _resolvers_strategy_list_resolver__WEBPACK_IMPORTED_MODULE_13__["StrategyListResolver"] },
                data: { roles: ['HR'] }
            },
            {
                path: 'admin',
                component: _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_6__["AdminPanelComponent"],
                resolve: { resolvedData: _resolvers_collaborator_list_resolver__WEBPACK_IMPORTED_MODULE_10__["CollaboratorListResolver"] },
                data: { roles: ['Admin', 'HR'] }
            },
            {
                path: 'admin/collaborators/:id',
                component: _collaborators_collaborator_detail_collaborator_detail_component__WEBPACK_IMPORTED_MODULE_12__["CollaboratorDetailComponent"],
                resolve: { user: _resolvers_collaborator_detail_resolver___WEBPACK_IMPORTED_MODULE_11__["CollaboratorDetailResolver"] }
            },
            {
                path: 'admin/collaborators/edit/:id',
                component: _collaborators_collaborator_edit_collaborator_edit_component__WEBPACK_IMPORTED_MODULE_3__["CollaboratorEditComponent"],
                resolve: { user: _resolvers_collaborator_detail_resolver___WEBPACK_IMPORTED_MODULE_11__["CollaboratorDetailResolver"] },
                canDeactivate: [_guards_prevent_unsave_changes_guards__WEBPACK_IMPORTED_MODULE_4__["PreventUnsavedChanges"]]
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];


/***/ }),

/***/ "./src/app/sheets/axis-user/axis-user.component.css":
/*!**********************************************************!*\
  !*** ./src/app/sheets/axis-user/axis-user.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sheets/axis-user/axis-user.component.html":
/*!***********************************************************!*\
  !*** ./src/app/sheets/axis-user/axis-user.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-2\">\n  <h4> {{strategyTitle}}</h4>\n  <p>{{strategyDescription}}</p>\n  <h4>Axes:</h4>\n  <table class=\"table table-hover\">\n    <tr>\n      <th style=\"width: 40%\">Titre</th>\n      <th style=\"width: 50%\">Description</th>\n      <th style=\"width: 10%\">Pondération</th>\n    </tr>\n    <tr *ngFor=\"let axis of axisInstances\">\n      <td>{{ axis.title }}</td>\n      <td>{{ axis.description }}</td>\n      <td>\n        <span class=\"badge badge-pill badge-danger\">{{axis.userWeight}} %</span>\n      </td>\n    </tr>\n  </table>\n</div>\n"

/***/ }),

/***/ "./src/app/sheets/axis-user/axis-user.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/sheets/axis-user/axis-user.component.ts ***!
  \*********************************************************/
/*! exports provided: AxisUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AxisUserComponent", function() { return AxisUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AxisUserComponent = /** @class */ (function () {
    function AxisUserComponent() {
    }
    AxisUserComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], AxisUserComponent.prototype, "strategyTitle", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], AxisUserComponent.prototype, "strategyDescription", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], AxisUserComponent.prototype, "axisInstances", void 0);
    AxisUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-axis-user',
            template: __webpack_require__(/*! ./axis-user.component.html */ "./src/app/sheets/axis-user/axis-user.component.html"),
            styles: [__webpack_require__(/*! ./axis-user.component.css */ "./src/app/sheets/axis-user/axis-user.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AxisUserComponent);
    return AxisUserComponent;
}());



/***/ }),

/***/ "./src/app/sheets/goal-card/goal-card.component.css":
/*!**********************************************************!*\
  !*** ./src/app/sheets/goal-card/goal-card.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".toggle {\n  position: relative;\n  float: right;\n}\n"

/***/ }),

/***/ "./src/app/sheets/goal-card/goal-card.component.html":
/*!***********************************************************!*\
  !*** ./src/app/sheets/goal-card/goal-card.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card mt-2 mb-2\">\n  <div class=\"card-header\">\n    <div class=\"toggle\">\n      <button type=\"button\" (click)=\"isCollapsed = !isCollapsed\" title=\"Réduire / Agrandir\">\n        <i *ngIf=\"!isCollapsed\" class=\"fa fa-caret-down\"></i>\n        <i *ngIf=\"isCollapsed\" class=\"fa fa-caret-up\"></i>\n      </button>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-8\">\n        {{goalsByAxisInstance.title}}\n      </div>\n      <div class=\"col-md-4\">\n        <span class=\"badge badge-pill badge-danger float-right\" title=\"Pondération d'axe\">\n          {{goalsByAxisInstance.userWeight}} %\n        </span>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"well\">Nombre d'objectifs: {{goalsByAxisInstance.totalGoals}}</div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"well\">\n          Poids total des objectifs:\n          <span class=\"badge badge-pill badge-success float-right\">\n            {{goalsByAxisInstance.totalGoalWeight}} %\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"card-body\" *ngIf=\"isCollapsed\">\n    <div class=\"alert alert-danger mt-3\" role=\"alert\" *ngIf=\"goalsByAxisInstance.goals && goalsByAxisInstance.goals.length === 0\">\n      <p>Aucun objectif n'a encore été ajouté...</p>\n    </div>\n\n    <table *ngIf=\"goalsByAxisInstance.goals && goalsByAxisInstance.goals.length > 0\" class=\"table table-hover\">\n      <tr>\n        <th style=\"width: 40%\">Objectif</th>\n        <th style=\"width: 20%\">Type d'objectif</th>\n        <th style=\"width: 20%\">Nom de projet</th>\n        <th style=\"width: 10%\">Poids</th>\n        <th style=\"width: 5%\"></th>\n        <th style=\"width: 5%\"></th>\n      </tr>\n      <tr *ngFor=\"let goal of goalsByAxisInstance.goals\">\n        <td>{{ goal.description }}</td>\n        <td>{{ goal.goalType.name }}</td>\n        <td>{{ goal.projectName }}</td>\n        <td>{{ goal.weight }}</td>\n        <td *ngIf=\"!isReadOnly\">\n          <button class=\"btn btn-info\" (click)=\"$event.stopPropagation()\" (click)=\"editGoalModal(goal)\">\n            <i class=\"fa fa-edit\"></i>\n          </button>\n        </td>\n        <td>\n          <button class=\"btn btn-danger\" (click)=\"$event.stopPropagation()\" (click)=\"deleteGoal(goal)\">\n            <i class=\"fa fa-trash\"></i>\n          </button>\n        </td>\n      </tr>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/sheets/goal-card/goal-card.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/sheets/goal-card/goal-card.component.ts ***!
  \*********************************************************/
/*! exports provided: GoalCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoalCardComponent", function() { return GoalCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _goal_edit_modal_goal_edit_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../goal-edit-modal/goal-edit-modal.component */ "./src/app/sheets/goal-edit-modal/goal-edit-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoalCardComponent = /** @class */ (function () {
    function GoalCardComponent(modalService) {
        this.modalService = modalService;
        this.editGoalEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.deleteGoalEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isCollapsed = true;
    }
    GoalCardComponent.prototype.ngOnInit = function () {
    };
    GoalCardComponent.prototype.editGoalModal = function (goal) {
        var _this = this;
        var initialState = {
            goal: goal,
            goalTypeList: this.goalTypeList,
            axisList: this.axisInstances
        };
        this.bsModalRef = this.modalService.show(_goal_edit_modal_goal_edit_modal_component__WEBPACK_IMPORTED_MODULE_2__["GoalEditModalComponent"], { initialState: initialState });
        this.bsModalRef.content.editGoalEvent.subscribe(function (updatedGoal) {
            _this.editGoalEvent.emit(updatedGoal);
        });
    };
    GoalCardComponent.prototype.deleteGoal = function (goal) {
        this.deleteGoalEvent.emit(goal);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GoalCardComponent.prototype, "goalsByAxisInstance", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], GoalCardComponent.prototype, "axisInstances", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], GoalCardComponent.prototype, "goalTypeList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], GoalCardComponent.prototype, "editGoalEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], GoalCardComponent.prototype, "deleteGoalEvent", void 0);
    GoalCardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-goal-card',
            template: __webpack_require__(/*! ./goal-card.component.html */ "./src/app/sheets/goal-card/goal-card.component.html"),
            styles: [__webpack_require__(/*! ./goal-card.component.css */ "./src/app/sheets/goal-card/goal-card.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalService"]])
    ], GoalCardComponent);
    return GoalCardComponent;
}());



/***/ }),

/***/ "./src/app/sheets/goal-edit-modal/goal-edit-modal.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/sheets/goal-edit-modal/goal-edit-modal.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sheets/goal-edit-modal/goal-edit-modal.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/sheets/goal-edit-modal/goal-edit-modal.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title pull-left\">Modifier Objectif</h4>\n  <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form #goalForm=\"ngForm\" id=\"goalForm\">\n\n    <h4>Axe:</h4>\n    <select class=\"form-control mb-1\" style=\"width: 200px\" id=\"axis\" name=\"axis\" [(ngModel)]=\"updatedGoal.axisInstanceId\" required>\n      <option *ngFor=\"let axis of axisList\" [ngValue]=\"axis.id\">\n        {{ axis.title }}\n      </option>\n    </select>\n\n    <h4>Objectif:</h4>\n    <textarea rows=\"2\" [(ngModel)]=\"updatedGoal.description\" name=\"goal\" required type=\"text\" class=\"form-control input-sm\" placeholder=\"Ajouter un objectif\"></textarea>\n\n    <h4>Type d'objectif:</h4>\n    <select class=\"form-control mb-1\" style=\"width: 200px\" id=\"goalType\" name=\"goalType\" [(ngModel)]=\"updatedGoal.goalTypeId\"\n      required>\n      <option *ngFor=\"let goalType of goalTypeList\" [ngValue]=\"goalType.id\">\n        {{ goalType.name }}\n      </option>\n    </select>\n\n    <div *ngIf=\"updatedGoal.goalTypeId === 3\">\n      <h4>Nom de projet:</h4>\n      <input [(ngModel)]=\"updatedGoal.projectName\" name=\"projectName\" type=\"text\" class=\"form-control input-sm\" placeholder=\"Nom de projet\"\n      />\n    </div>\n\n    <h4>Poids d'objectif:</h4>\n    <input [(ngModel)]=\"updatedGoal.weight\" name=\"goalWeight\" required type=\"number\" class=\"form-control input-sm\" />\n\n    <h4>Statut:</h4>\n    {{updatedGoal.status}}\n\n\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"bsModalRef.hide()\">Annuler</button>\n  <button type=\"button\" class=\"btn btn-success\" (click)=\"updateGoal()\" form=\"goalForm\" [disabled]=\"!goalForm.valid || !goalForm.dirty\">Mettre à jour</button>\n</div>\n"

/***/ }),

/***/ "./src/app/sheets/goal-edit-modal/goal-edit-modal.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/sheets/goal-edit-modal/goal-edit-modal.component.ts ***!
  \*********************************************************************/
/*! exports provided: GoalEditModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoalEditModalComponent", function() { return GoalEditModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoalEditModalComponent = /** @class */ (function () {
    function GoalEditModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.editGoalEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.updatedGoal = {};
    }
    GoalEditModalComponent.prototype.ngOnInit = function () {
        this.updatedGoal = {
            'id': this.goal.id,
            'description': this.goal.description,
            'axisInstanceId': this.goal.axisInstance.id,
            'goalTypeId': this.goal.goalType.id,
            'projectName': this.goal.projectName,
            'weight': this.goal.weight,
            'status': this.goal.status
        };
    };
    GoalEditModalComponent.prototype.updateGoal = function () {
        if (this.updatedGoal.goalTypeId !== 3) {
            this.updatedGoal.projectName = '';
        }
        this.editGoalEvent.emit(this.updatedGoal);
        this.bsModalRef.hide();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], GoalEditModalComponent.prototype, "editGoalEvent", void 0);
    GoalEditModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-goal-edit-modal',
            template: __webpack_require__(/*! ./goal-edit-modal.component.html */ "./src/app/sheets/goal-edit-modal/goal-edit-modal.component.html"),
            styles: [__webpack_require__(/*! ./goal-edit-modal.component.css */ "./src/app/sheets/goal-edit-modal/goal-edit-modal.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"]])
    ], GoalEditModalComponent);
    return GoalEditModalComponent;
}());



/***/ }),

/***/ "./src/app/sheets/goal-new/goal-new.component.css":
/*!********************************************************!*\
  !*** ./src/app/sheets/goal-new/goal-new.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sheets/goal-new/goal-new.component.html":
/*!*********************************************************!*\
  !*** ./src/app/sheets/goal-new/goal-new.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form #goalForm=\"ngForm\" (ngSubmit)=\"goalForm.valid && createGoal()\">\n  <div class=\"row\">\n    <div class=\"col-md-5 form-group required\">\n      <label class='control-label'>Axe:</label>\n      <select class=\"form-control mb-1\" id=\"axisId\" name=\"axisId\" [(ngModel)]=\"newGoal.axisInstanceId\">\n        <option *ngFor=\"let axis of axisInstances\" [ngValue]=\"axis.id\">\n          {{ axis.title }}\n        </option>\n      </select>\n    </div>\n\n    <div class=\"col-md-4 form-group required\">\n      <label class='control-label'>Type d'objectif:</label>\n      <select class=\"form-control mb-1\" id=\"objectifTypeId\" name=\"goalTypeId\" [(ngModel)]=\"newGoal.goalTypeId\">\n        <option *ngFor=\"let goalType of goalTypeList\" [ngValue]=\"goalType.id\">\n          {{ goalType.name }}\n        </option>\n      </select>\n    </div>\n\n    <div class=\"col-md-3 form-group required\">\n      <label class='control-label'>Poid d'objectif:</label>\n      <input [(ngModel)]=\"newGoal.weight\" name=\"goalWeight\" required type=\"number\" min=\"1\" max=\"100\" class=\"form-control input-sm\"\n        placeholder=\"Poid d'objectif\" />\n    </div>\n  </div>\n\n  <div class=\"row\" *ngIf=\"newGoal.goalTypeId === 3\">\n    <div class=\"col form-group\">\n      <label class='control-label'>Nom de projet:</label>\n      <input [(ngModel)]=\"newGoal.projectName\" name=\"projectName\" type=\"text\" class=\"form-control input-sm\" placeholder=\"Nom de projet\"\n      />\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col form-group required\">\n      <label class='control-label'>Objectif:</label>\n      <textarea rows=\"2\" [(ngModel)]=\"newGoal.description\" name=\"description\" required type=\"text\" class=\"form-control input-sm\"\n        placeholder=\"Objectif\"></textarea>\n\n    </div>\n  </div>\n\n  <button class=\"btn btn-primary\" [disabled]=\"!goalForm.valid\">\n    Ajouter\n  </button>\n</form>\n"

/***/ }),

/***/ "./src/app/sheets/goal-new/goal-new.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/sheets/goal-new/goal-new.component.ts ***!
  \*******************************************************/
/*! exports provided: GoalNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoalNewComponent", function() { return GoalNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GoalNewComponent = /** @class */ (function () {
    function GoalNewComponent() {
        this.createGoalEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.newGoal = {};
    }
    GoalNewComponent.prototype.ngOnInit = function () {
    };
    GoalNewComponent.prototype.createGoal = function () {
        if (this.newGoal.goalTypeId != 3) {
            this.newGoal.projectName = '';
        }
        this.createGoalEvent.emit(this.newGoal);
        this.newGoal.description = '';
        this.newGoal.weight = '';
        this.newGoal.axisInstanceId = '';
        this.newGoal.goalTypeId = '';
        this.newGoal.projectName = '';
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], GoalNewComponent.prototype, "axisInstances", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], GoalNewComponent.prototype, "goalTypeList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], GoalNewComponent.prototype, "createGoalEvent", void 0);
    GoalNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-goal-new',
            template: __webpack_require__(/*! ./goal-new.component.html */ "./src/app/sheets/goal-new/goal-new.component.html"),
            styles: [__webpack_require__(/*! ./goal-new.component.css */ "./src/app/sheets/goal-new/goal-new.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], GoalNewComponent);
    return GoalNewComponent;
}());



/***/ }),

/***/ "./src/app/sheets/goals/goals.component.css":
/*!**************************************************!*\
  !*** ./src/app/sheets/goals/goals.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-group.required .control-label:after {\n  content: \"*\";\n  color: red;\n}\n\n.toggle {\n  position: relative;\n  float: right;\n}\n"

/***/ }),

/***/ "./src/app/sheets/goals/goals.component.html":
/*!***************************************************!*\
  !*** ./src/app/sheets/goals/goals.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-2\">\n  <div class=\"toggle\">\n    <button type=\"button\" (click)=\"isCollapsed = !isCollapsed\" title=\"Réduire / Agrandir\">\n      <i *ngIf=\"!isCollapsed\" class=\"fa fa-caret-down\"></i>\n      <i *ngIf=\"isCollapsed\" class=\"fa fa-caret-up\"></i>\n    </button>\n  </div>\n\n  <div class=\"card\">\n    <div class=\"card-header\" *ngIf=\"isCollapsed\">\n      <app-goal-new [axisInstances]=\"axisInstances\" [goalTypeList]=\"goalTypeList\" (createGoalEvent)=\"handleCreateGoal($event)\"></app-goal-new>\n    </div>\n\n    <div class=\"card-body\">\n      <div *ngIf=\"goalsByAxisInstanceList\">\n        <div *ngFor=\"let goalsByAxisInstance of goalsByAxisInstanceList\">\n          <app-goal-card [axisInstances]=\"axisInstances\" [goalTypeList]=\"goalTypeList\" [goalsByAxisInstance]=\"goalsByAxisInstance\"\n            (editGoalEvent)=\"handleEditGoal($event)\" (deleteGoalEvent)=\"handleDeleteGoal($event)\"></app-goal-card>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/sheets/goals/goals.component.ts":
/*!*************************************************!*\
  !*** ./src/app/sheets/goals/goals.component.ts ***!
  \*************************************************/
/*! exports provided: GoalsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoalsComponent", function() { return GoalsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GoalsComponent = /** @class */ (function () {
    function GoalsComponent() {
        this.createGoalEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.editGoalEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.deleteGoalEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isCollapsed = true;
    }
    GoalsComponent.prototype.ngOnInit = function () {
    };
    GoalsComponent.prototype.handleCreateGoal = function (newGoal) {
        this.createGoalEvent.emit(newGoal);
    };
    GoalsComponent.prototype.handleEditGoal = function (goal) {
        this.editGoalEvent.emit(goal);
    };
    GoalsComponent.prototype.handleDeleteGoal = function (goal) {
        this.deleteGoalEvent.emit(goal);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], GoalsComponent.prototype, "axisInstances", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], GoalsComponent.prototype, "goalsByAxisInstanceList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], GoalsComponent.prototype, "goalTypeList", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], GoalsComponent.prototype, "createGoalEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], GoalsComponent.prototype, "editGoalEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], GoalsComponent.prototype, "deleteGoalEvent", void 0);
    GoalsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-goals',
            template: __webpack_require__(/*! ./goals.component.html */ "./src/app/sheets/goals/goals.component.html"),
            styles: [__webpack_require__(/*! ./goals.component.css */ "./src/app/sheets/goals/goals.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], GoalsComponent);
    return GoalsComponent;
}());



/***/ }),

/***/ "./src/app/sheets/sheet-detail/sheet-detail.component.css":
/*!****************************************************************!*\
  !*** ./src/app/sheets/sheet-detail/sheet-detail.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sheets/sheet-detail/sheet-detail.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/sheets/sheet-detail/sheet-detail.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-4\">\n  <div class=\"row\">\n    <h1>Fiche d'évaluation</h1>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-3\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div>\n            <strong>Titre:</strong>\n            <p>{{ sheetDetail.title }}</p>\n          </div>\n          <div>\n            <strong>Année:</strong>\n            <p>{{ sheetDetail.year }}</p>\n          </div>\n          <div>\n            <strong>Statut:</strong>\n            <p>{{ sheetDetail.status }}</p>\n          </div>\n          <div>\n            <strong>Matricule:</strong>\n            <p>{{ sheetDetail.employeeNumber }}</p>\n          </div>\n          <div>\n            <strong>Nom de l'employé:</strong>\n            <p>{{ sheetDetail.ownerName }}</p>\n          </div>\n          <div>\n            <strong>Fonction:</strong>\n            <p>{{ sheetDetail.ownerTitle }}</p>\n          </div>\n          <div>\n            <strong>Pôle/entité:</strong>\n            <p>{{ sheetDetail.axisInstances[0].poleName }}</p>\n          </div>\n          <div>\n            <strong>Créé:</strong>\n            <p>{{ sheetDetail.created | date: 'mediumDate' }}</p>\n          </div>\n        </div>\n        <div class=\"card-footer\">\n          <div class=\"btn-group d-fles\">\n            <button class=\"btn btn-success w-70 mr-1\" [routerLink]=\"['/sheets']\">\n              Retour au List\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-9\">\n      <div class=\"tab-panel panel-body\">\n        <tabset class=\"strategy-tabset\">\n          <tab heading=\"Stratégie\">\n            <app-axis-user [strategyTitle]=\"sheetDetail.strategyTitle\" [strategyDescription]=\"sheetDetail.strategyDescription\" [axisInstances]=\"sheetDetail.axisInstances\"></app-axis-user>\n          </tab>\n          <tab heading=\"Définition des Objectifs\">\n            <div *ngIf=\"goalsByAxisInstanceList\">\n              <app-goals [goalsByAxisInstanceList]=\"goalsByAxisInstanceList\" [axisInstances]=\"sheetDetail.axisInstances\" [goalTypeList]=\"goalTypeList\"\n                (createGoalEvent)=\"handleCreateGoal($event)\" (editGoalEvent)=\"handleEditGoal($event)\" (deleteGoalEvent)=\"handleDeleteGoal($event)\"></app-goals>\n            </div>\n          </tab>\n          <tab heading=\"Évaluation des objectifs\">\n            <div class=\"container \">\n\n            </div>\n          </tab>\n          <tab heading=\"Évaluation des Compétences\">\n            <div class=\"container \">\n\n            </div>\n          </tab>\n        </tabset>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/sheets/sheet-detail/sheet-detail.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/sheets/sheet-detail/sheet-detail.component.ts ***!
  \***************************************************************/
/*! exports provided: SheetDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SheetDetailComponent", function() { return SheetDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SheetDetailComponent = /** @class */ (function () {
    function SheetDetailComponent(route, userService, authService, alertify) {
        this.route = route;
        this.userService = userService;
        this.authService = authService;
        this.alertify = alertify;
        this.loading = false;
        this.goalsGroupedByAxis = {};
    }
    SheetDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            var resolvedData = data['resolvedData'];
            _this.sheetDetail = resolvedData['sheetDetail'];
            _this.goalTypeList = resolvedData['goalTypeList'];
            _this.getGoalsForAxis();
        });
    };
    SheetDetailComponent.prototype.getGoalsForAxis = function () {
        var _this = this;
        var axisInstanceIds = this.sheetDetail.axisInstances.map(function (a) { return a.id; });
        this.loading = true;
        this.userService
            .getGoalsForAxis(this.authService.decodedToken.nameid, axisInstanceIds)
            .subscribe(function (result) {
            _this.loading = false;
            _this.goalsByAxisInstanceList = result;
        }, function (error) {
            _this.loading = false;
            _this.alertify.error('Impossible d\'avoir les objectifs');
        });
    };
    SheetDetailComponent.prototype.handleCreateGoal = function (newGoal) {
        var _this = this;
        this.loading = true;
        this.userService.createGoal(this.authService.decodedToken.nameid, newGoal).subscribe(function () {
            _this.loading = false;
            _this.getGoalsForAxis();
            _this.alertify.success('Objectif est créé avec succèes');
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    SheetDetailComponent.prototype.handleEditGoal = function (goal) {
        var _this = this;
        this.loading = true;
        this.userService.updateGoal(goal.id, this.authService.decodedToken.nameid, goal).subscribe(function () {
            _this.loading = false;
            _this.alertify.success('Objectif a été mis à jour.');
            _this.getGoalsForAxis();
        }, function (error) {
            _this.loading = false;
            _this.alertify.error(error);
        });
    };
    SheetDetailComponent.prototype.handleDeleteGoal = function (goal) {
        var _this = this;
        this.alertify.confirm("Etes-vous sur de vouloir supprimer l'objectif: " + goal.description + "?", function () {
            _this.loading = true;
            _this.userService
                .deleteGoal(goal.id, _this.authService.decodedToken.nameid)
                .subscribe(function () {
                _this.loading = false;
                _this.getGoalsForAxis();
                _this.alertify.success('L\'objectif a été supprimée');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error('Impossible de supprimer l\'objectif');
            });
        });
    };
    SheetDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sheet-detail',
            template: __webpack_require__(/*! ./sheet-detail.component.html */ "./src/app/sheets/sheet-detail/sheet-detail.component.html"),
            styles: [__webpack_require__(/*! ./sheet-detail.component.css */ "./src/app/sheets/sheet-detail/sheet-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"]])
    ], SheetDetailComponent);
    return SheetDetailComponent;
}());



/***/ }),

/***/ "./src/app/sheets/sheets-panel/sheets-panel.component.css":
/*!****************************************************************!*\
  !*** ./src/app/sheets/sheets-panel/sheets-panel.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sheets/sheets-panel/sheets-panel.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/sheets/sheets-panel/sheets-panel.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n  <h2>Panneau de fiches d'évaluation</h2>\n  <div class=\"tab-panel\">\n    <tabset class=\"member-tabset\">\n      <tab heading=\"Mes fiches d'évaluation\">\n        <div class=\"row\">\n          <div class=\"container\">\n            <table *ngIf=\"sheets?.length > 0\" class=\"table table-hover  mt-2\" style=\"cursor: pointer\">\n              <tr>\n                <th style=\"width: 30%\">Titre</th>\n                <th style=\"width: 10%\">Année</th>\n                <th style=\"width: 25%\">Stratégie</th>\n                <td style=\"width: 15%\">Créé</td>\n              </tr>\n              <tr *ngFor=\"let evaluationFileInsatnce of sheets\" [routerLink]=\"['/sheets/', evaluationFileInsatnce.id]\">\n                <td>{{ evaluationFileInsatnce.title }}</td>\n                <td>{{ evaluationFileInsatnce.year }}</td>\n                <td>{{ evaluationFileInsatnce.strategyTitle }}</td>\n                <td>\n                  {{ evaluationFileInsatnce.created | date: 'mediumDate' }}\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </tab>\n\n      <tab heading=\"Fiches d'évaluation de mes collaborateurs\">\n        <div class=\"container\">\n          les fiches de mes collaborateurs\n        </div>\n      </tab>\n    </tabset>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/sheets/sheets-panel/sheets-panel.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/sheets/sheets-panel/sheets-panel.component.ts ***!
  \***************************************************************/
/*! exports provided: SheetsPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SheetsPanelComponent", function() { return SheetsPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _goal_edit_modal_goal_edit_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../goal-edit-modal/goal-edit-modal.component */ "./src/app/sheets/goal-edit-modal/goal-edit-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


;





var SheetsPanelComponent = /** @class */ (function () {
    function SheetsPanelComponent(modalService, route, userService, authService, alertify) {
        this.modalService = modalService;
        this.route = route;
        this.userService = userService;
        this.authService = authService;
        this.alertify = alertify;
        this.loading = false;
    }
    SheetsPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.sheets = data['sheets'].result;
            _this.pagination = data['sheets'].pagination;
        });
    };
    SheetsPanelComponent.prototype.handleDeleteGoal = function (id) {
        var _this = this;
        this.alertify.confirm('Etes-vous sur de vouloir supprimer cet objectif?', function () {
            _this.loading = true;
            _this.userService
                .deleteGoal(id, _this.authService.decodedToken.nameid)
                .subscribe(function () {
                _this.loading = false;
                _this.goalList.splice(_this.goalList.findIndex(function (a) { return a.id === id; }), 1);
                _this.alertify.success('L\'objectif a été supprimé');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error('Impossible de supprimer l\'objectif');
            });
        });
    };
    SheetsPanelComponent.prototype.editAxisModal = function (goal) {
        var _this = this;
        var initialState = {
            goal: goal
        };
        this.bsModalRef = this.modalService.show(_goal_edit_modal_goal_edit_modal_component__WEBPACK_IMPORTED_MODULE_6__["GoalEditModalComponent"], { initialState: initialState });
        this.bsModalRef.content.updateSelectedGoal.subscribe(function (updatedGoal) {
            _this.loading = true;
            _this.userService.updateGoal(goal.id, _this.authService.decodedToken.nameid, updatedGoal).subscribe(function () {
                _this.loading = false;
                _this.alertify.success('L\'objectif été mis à jour.');
            }, function (error) {
                _this.loading = false;
                _this.alertify.error(error);
            });
        });
    };
    SheetsPanelComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sheets-panel',
            template: __webpack_require__(/*! ./sheets-panel.component.html */ "./src/app/sheets/sheets-panel/sheets-panel.component.html"),
            styles: [__webpack_require__(/*! ./sheets-panel.component.css */ "./src/app/sheets/sheets-panel/sheets-panel.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["BsModalService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], SheetsPanelComponent);
    return SheetsPanelComponent;
}());



/***/ }),

/***/ "./src/app/strategies/strategies.component.html":
/*!******************************************************!*\
  !*** ./src/app/strategies/strategies.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <div class=\"row\" *ngIf=\"strategies.length == 0\">\n    <h3>Pas de strategies</h3>\n  </div>\n\n  <div *ngIf=\"strategies.length > 0\">\n    <div class=\"card mt-2 mb-2\" *ngFor=\"let strategy of strategies\">\n      <div class=\"card-header\">\n        <div class=\"float-left mr-2\" *ngIf=\"strategy.documentationUrl\">\n          <a href=\"{{strategy.documentationUrl}}\" target=\"_blanc\" class=\"mt-2\">\n            <img src=\"../../../../assets/document.png\" alt=\"documentation\" width=\"40px\" height=\"50px\">\n          </a>\n        </div>\n        <h6 class=\"card-subtitle mb-2 text-muted\">{{strategy.title}}</h6>\n        <button type=\"button\" class=\"btn btn-primary float-right\" (click)=\"viewToggle()\">\n          Changer de vue\n        </button>\n        <p class=\"card-text\">{{strategy.description}}</p>\n      </div>\n\n      <div class=\"card-body\" [ngStyle]=\"{'background-color':viewMode ? 'white' : 'grey' }\">\n        <carousel *ngIf=\"!viewMode\">\n          <slide *ngFor=\"let axis of strategy.axisList\">\n            <div class=\"text-center py-5\">\n              <h2>{{axis.title}}</h2>\n              <p class=\"card-text text-info text-center\">{{axis.description}}</p>\n              <ul class=\"list-inline text-center\">\n                <li class=\"list-inline-item\" *ngFor=\"let ap of axis.axisPoles\">\n                  <div class=\"card text-center\" style=\"width: 15rem;\">\n                    <div class=\"card-body\">\n                      <h4 class=\"card-title text-center mb-1\">\n                        {{ap.poleName}}\n                      </h4>\n                      <span class=\"badge badge-pill badge-danger\">\n                        <h1>{{ap.weight}} %</h1>\n                      </span>\n                    </div>\n                  </div>\n                </li>\n              </ul>\n            </div>\n          </slide>\n        </carousel>\n\n        <table *ngIf=\"viewMode\" class=\"table table-hover\">\n          <tr>\n            <th style=\"width: 20%\">Titre d'axis</th>\n            <th style=\"width: 30%\">Description d'axe</th>\n            <th style=\"width: 50%\">Poles / Pondération</th>\n\n          </tr>\n          <tr *ngFor=\"let axis of strategy.axisList\">\n            <td class=\"align-middle\">{{ axis.title }}</td>\n            <td class=\"align-middle\">{{ axis.description }}</td>\n            <td>\n              <table>\n                <tr *ngFor=\"let ap of axis.axisPoles\">\n                  <td>{{ap.poleName}}</td>\n                  <td>\n                    <span class=\"badge badge-pill badge-danger\">\n                      {{ap.weight}} %\n                    </span>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/strategies/strategies.component.ts":
/*!****************************************************!*\
  !*** ./src/app/strategies/strategies.component.ts ***!
  \****************************************************/
/*! exports provided: StrategiesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategiesComponent", function() { return StrategiesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StrategiesComponent = /** @class */ (function () {
    function StrategiesComponent(route) {
        this.route = route;
        this.viewMode = false;
    }
    StrategiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.strategies = data['strategies'];
        });
    };
    StrategiesComponent.prototype.viewToggle = function () {
        this.viewMode = !this.viewMode;
    };
    StrategiesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-strategies',
            template: __webpack_require__(/*! ./strategies.component.html */ "./src/app/strategies/strategies.component.html"),
            styles: ['./strategies.component.css']
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], StrategiesComponent);
    return StrategiesComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    apiUrl: 'http://localhost:5000/api/'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/elmehdiaitbrahim/Projects/Sothema/SothemaGoalManagment/SothemaGoalManagement-SPA/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map