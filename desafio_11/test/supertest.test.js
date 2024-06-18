import * as chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080')



describe("Test Cattalina Deco-Home", () => {

     // Test Sessions
     describe("Testeando login y sesiones con cookies", () => {

        before(function () {
            this.cookie;
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

        it("Test Login Usuario: Se debe loguear correctamente al usuario registrado anteriormente.", async function () {
            // Given
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password
            }

            // Then
            const result = await requester.post('/api/sessions/login').send(mockLogin)
            // console.log(result);
            const cookieResult = result.headers['set-cookie'][0]

            const cookieData = cookieResult.split("=")
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }

            // Assert
            expect(result.statusCode).is.eqls(200)
            expect(this.cookie.name).to.be.ok.and.eql('jwtCookieToken')
            expect(this.cookie.value).to.be.ok
        })

        // // Test_03
        // it("Test Ruta Protegida: Debe enviar la cookie que contiene el usuario y destructurarla correctamente.", async function () {
        //     // Given

        //     // Then
        //     const { _body } = await requester.get("/api/sessions/current").set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

        //     // Assert
        //     expect(_body.payload.email).to.be.ok.and.eql(this.mockUser.email)
        // })


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
            const result = await requester.post('/api/products/').send(this.mockProducto)
            // console.log(result)
            // Assert
            expect(result.statusCode).is.eql(201);
        })

        it("Test Eliminacion de Producto: Se debe eliminar correctamente el producto registrado anteriormente.", async function () {
            // Given

            // Then
            const result = await requester.delete('/api/products/').send(this.mockProducto)
            // console.log(result);

            // Assert
            expect(result.statusCode).is.eqls(200)
        })

        // // Test_03
        // it("Test Ruta Protegida: Debe enviar la cookie que contiene el usuario y destructurarla correctamente.", async function () {
        //     // Given

        //     // Then
        //     const { _body } = await requester.get("/api/sessions/current").set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

        //     // Assert
        //     expect(_body.payload.email).to.be.ok.and.eql(this.mockUser.email)
        // })

    })
    //Test Carrito
    describe("Testeando rutas de carritos", () => {
        before(function () {
            this.mockCart = {
                products: {
                    product: {
                        title: 'Nombre de producto de prueba',
                        description: 'Descripcion de producto de prueba',
                        code: 'CodigoDePrueba',
                        price: 100,
                        status: true,
                        stock: 1,
                        category: 'Categoria de prueba',
                        thumbnail: 'Thumbail de prueba',
                        owner: 'admin'
                    },
                    quantity: 1
                }
            }
        })

        it("Test Creacion Carts: Debe poder crear correctamente un carrito", async function () {
            // Then
            const result = await requester.post('/api/carts/')
            console.log(result)
            this.cartId = result.body._id
            // Assert
            expect(result.statusCode).is.eql(201);
        })

        it("Test Agregar Carts: Debe poder agregar al carrito creado un producto enviado", async function () {
            // Then
            const result = await requester.post(`/api/carts/${this.cartId}/product/`)
            // Assert
            expect(result.statusCode).is.eql(201);
        })

        it("Test Eliminacion de Carrito: Se debe eliminar correctamente el carrito registrado anteriormente.", async function () {
            // Given

            // Then
            const result = await requester.delete('/api/products/').send(this.mockProducto)
            // console.log(result);

            // Assert
            expect(result.statusCode).is.eqls(200)
        })

        // // Test_03
        // it("Test Ruta Protegida: Debe enviar la cookie que contiene el usuario y destructurarla correctamente.", async function () {
        //     // Given

        //     // Then
        //     const { _body } = await requester.get("/api/sessions/current").set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

        //     // Assert
        //     expect(_body.payload.email).to.be.ok.and.eql(this.mockUser.email)
        // })

    })
   
})