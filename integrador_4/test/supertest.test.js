import * as chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080')


describe("Test Cattalina Deco-Home", () => {
    
    let cookie = {}
    let prodId = ''
    let cartId = ''
     // Test Sessions
     describe("Testeando login y sesiones con cookies", () => {

        before(function () {
            this.mockUser = {
                firstName: "Usuario de prueba3",
                lastName: "Apellido de prueba3",
                email: "correodeprueba4@gmail.com",
                age: 20,
                password: "123456"
            }
        })

        it("Test Registro Usuario: Debe poder registrar correctamente un usuario", async function () {
            // Then
            const { statusCode } = await requester.post('/api/sessions/register').send(this.mockUser)
            // Assert
            expect(statusCode).is.eql(201);
        })
        it("Test Login Usuario: No se debe poder loguear correctamente un usuario sin credenciales completas", async function () {
            //Given
            const mockLoginIncompleto = {
                email: this.mockUser.email
            }
            // Then
            const { statusCode } = await requester.post('/api/sessions/register').send(mockUserIncompleto)
            // Assert
            expect(statusCode).is.eql(201);
        })

        it("Test Login Usuario: Se debe loguear correctamente al usuario registrado anteriormente.", async function () {
            // Given
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password
            }
            // Then
            const result = await requester.post('/api/sessions/login').send(mockLogin)
            const cookieResult = result.headers['set-cookie'][0]
            const cookieData = cookieResult.split("=")
            cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }
            // Assert
            expect(result.statusCode).is.eqls(200)
            expect(cookie.name).to.be.ok.and.eql('jwtCookieToken')
            expect(cookie.value).to.be.ok
        })


    })
    //Test Productos
    describe("Testeando rutas de productos", () => {
        before(function () {
            this.mockProducto = {
                title: 'Nombre de producto de prueba',
                description: 'Descripcion de producto de prueba',
                code: 'CodigoDePrueba',
                price: 100,
                status: true,
                stock: 1,
                category: 'Categoria de prueba',
                thumbnail: 'Thumbail de prueba',
                owner: 'admin'
            }
        })

        it("Test Registro Producto: Debe poder registrar correctamente un producto", async function () {
            // Then
            const result = await requester.post('/api/products/').send(this.mockProducto).set('Cookie', [`${cookie.name}=${cookie.value}`]);
            prodId = result.body._id
            // Assert
            expect(result.statusCode).is.eql(201);
        })

        it("Test Eliminacion de Producto: Se debe eliminar correctamente el producto registrado anteriormente.", async function () {
            // Then
            const result = await requester.delete(`/api/products/${this.prodId}`).send(this.mockProducto).set('Cookie', [`${cookie.name}=${cookie.value}`])
            // Assert
            expect(result.statusCode).is.eqls(200)
        })

    })
    //Test Carrito
    describe("Testeando rutas de carritos", () => {
        before(function () {
            this.mockProducto = {
                _id:'6670f4a7dd16e0d9eb9ea8d4',
                title: 'Nombre de producto de prueba',
                description: 'Descripcion de producto de prueba',
                code: 'CodigoDePrueba',
                price: 100,
                status: true,
                stock: 1,
                category: 'Categoria de prueba',
                thumbnail: 'Thumbail de prueba',
                owner: 'admin'
            }
        })

        it("Test Creacion Carts: Debe poder crear correctamente un carrito", async function () {
            // Then
            const result = await requester.post('/api/carts/')
            cartId = result.body._id
            // Assert
            expect(result.statusCode).is.eql(201);
        })

        it("Test Agregar Carts: Debe poder agregar al carrito creado un producto enviado", async function () {
            // Then
            const result = await requester.post(`/api/carts/${cartId}/product/${this.mockProducto._id}`).set('Cookie', [`${cookie.name}=${cookie.value}`])
            // Assert
            expect(result.statusCode).is.eql(201);
        })

        it("Test Eliminacion de Carrito: Se debe eliminar correctamente el producto del carrito registrado anteriormente.", async function () {
            // Then
            const result = await requester.delete(`/api/carts/${cartId}/product/${this.mockProducto._id}`).set('Cookie', [`${cookie.name}=${cookie.value}`])
            // Assert
            expect(result.statusCode).is.eqls(200)
        })

      
    })
   
})