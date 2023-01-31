import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {CategoryStateType} from "../../redux/categorySlice"
import {CategoryType} from "../../types"
import {CartStateType} from "../../redux/cartSlice"
import {AuthStateType, logout} from "../../redux/authSlice"

function Header() {
  const categoryState: CategoryStateType = useSelector((state: RootStateType) => state.category)
  const cartState: CartStateType = useSelector((state: RootStateType) => state.cart)
  const authState: AuthStateType = useSelector((state: RootStateType) => state.auth)

  const dispatch = useDispatch()

  return (
    <>
      <div className="top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7 col-sm-6 hidden-xs">
              <p className="top-text">Typescript E-Ticaret</p>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
              <ul>
                <li>+180-123-4567</li>
                <li>info@demo.com</li>
                <li><a href="#">Help</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div className="header-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
              <div className="logo">
                <Link to="/">
                  <img src="assets/images/logo.png" alt=""/>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="search-bg">
                <input type="text" className="form-control" placeholder="Search Here"/>
                <button type="submit"><i className="fa fa-search"></i></button>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className="account-section">
                <ul>
                  {
                    authState.token
                      ? (
                        <>
                          <li>
                            <Link to={'/user'} className="title hidden-xs">
                              {authState.email}
                            </Link>
                          </li>
                          <li className="hidden-xs">|</li>
                          <li>
                            <a onClick={() => {
                              dispatch(logout())
                            }} className="title hidden-xs">
                              Logout
                            </a>
                          </li>
                        </>
                      )
                      : (
                        <>
                          <li>
                            <Link to={'/auth/register'} className="title hidden-xs">
                              Register
                            </Link>
                          </li>
                          <li className="hidden-xs">|</li>
                          <li>
                            <Link to={'/auth/login'} className="title hidden-xs">
                              Login
                            </Link>
                          </li>
                        </>
                      )
                  }


                  <li>
                    <Link to={'/cart'} className="title">
                      <i className="fa fa-shopping-cart"></i>
                      <sup className="cart-quantity">
                        {cartState.cart?.items.length}
                      </sup>
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>


        <div className="navigation">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div id="navigation">
                  <ul>

                    <li className="active">
                      <Link to="/">
                        Home
                      </Link>
                    </li>

                    {
                      categoryState.initialized === true
                        ? (
                          <li className="has-sub">
                            <a href="#">
                              Categories
                            </a>
                            <ul>
                              {categoryState.categories.map((item: CategoryType, index: number) => {
                                return <li key={index}>
                                  <Link to={'category-details/' + item.code}>
                                    {item.name}
                                  </Link>
                                </li>
                              })}
                            </ul>
                          </li>
                        )
                        : (
                          <li>
                            <a>
                              Loading...
                            </a>
                          </li>
                        )
                    }


                    <li><a href="about.html">About</a>
                    </li>
                    <li className="has-sub"><a href="#">Pages</a>
                      <ul>
                        <li><a href="checkout.html">Checkout Form</a></li>
                        <li><a href="cart.html">Cart</a></li>
                        <li><a href="login-form.html">Login</a></li>
                        <li><a href="signup-form.html">Signup</a></li>
                        <li><a href="404-page.html">404-page</a></li>
                        <li><a href="styleguide.html">styleguide</a></li>
                      </ul>
                    </li>
                    <li className="has-sub"><a href="#">Blog</a>
                      <ul>
                        <li><a href="blog-default.html">Blog Default</a></li>
                        <li><a href="blog-single.html">Blog Single</a></li>
                      </ul>
                    </li>
                    <li><a href="contact-us.html">Contact Us</a>
                    </li>
                    <li><a href="template-feature.html">Template Feature</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Header
