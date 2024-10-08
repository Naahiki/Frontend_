import { Component } from "react";
import Filter from "./components/Filter/Filter";
import { ProductListingSection } from "./components/ProductListingSection/ProductListingSection";
import { Loader } from "../../components/Loader/Loader"; 
import "./ProductListing.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';


class ProductListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      filteredProducts: [],
      loading: true, // Estado para el loader
      error: null, // Estado para manejar los errores
      showScrollButton: false,
    };
  }

  componentDidMount() {
    this.fetchProducts();
    window.addEventListener("scroll", this.handleScroll); 
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll); 
  }

  handleScroll = () => {
    if (window.scrollY > 300) {
      this.setState({ showScrollButton: true });
    } else {
      this.setState({ showScrollButton: false });
    }
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  fetchProducts = async () => {
    this.setState({ loading: true, error: null });
  
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/travel-packs`, { 
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,  // Si el backend utiliza cookies o sesión
      });
  
      this.setState({
        products: response.data,
        filteredProducts: response.data,
        loading: false, // Desactiva el loader cuando termina la carga
      });
    } catch (error) {
      console.error("Error al obtener los paquetes de viaje", error);
      this.setState({ loading: true, error: "Error al cargar los productos" });
    }
  };
  
  

  monthOrder = (month) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months.indexOf(month) + 1;
  };

  handleFilterChange = (filters) => {
    this.setState({ loading: true }); 

    const filtered = this.state.products.filter((product) => {
      const isDestinationMatch = product.pack_destination
        .toLowerCase()
        .includes(filters.destination.toLowerCase());

      const isPriceMatch =
        (!filters.minPrice || product.pack_price >= filters.minPrice) &&
        (!filters.maxPrice || product.pack_price <= filters.maxPrice);

      const productMonth = this.monthOrder(product.pack_date);
      const startMonth = filters.startMonth ? this.monthOrder(filters.startMonth) : null;
      const endMonth = filters.endMonth ? this.monthOrder(filters.endMonth) : null;

      const isDateMatch =
        (!startMonth && !endMonth) ||
        (startMonth && productMonth >= startMonth && endMonth && productMonth <= endMonth);

      const isCategoryMatch =
        !filters.category || product.pack_category === filters.category;

      return isDestinationMatch && isPriceMatch && isDateMatch && isCategoryMatch;
    });

    setTimeout(() => {
      this.setState({ filteredProducts: filtered, loading: false });
    }, 500); 
  };

  render() {
    const { filteredProducts, loading, error,showScrollButton  } = this.state;

    return (
      <div className="page-container">
        <Filter onFilterChange={this.handleFilterChange} />

        {loading ? (
          <Loader /> 
        ) : error ? (
          <p className="error-message">{error}</p> 
        ) : filteredProducts.length === 0 ? (
          <p className="no-matches">No se encontraron coincidencias para los filtros aplicados.</p>
        ) : (
          <ProductListingSection products={filteredProducts} />
        )}
         {/* Flecha hacia arriba, visible solo si showScrollButton es true */}
         {showScrollButton && (
          <button className="scroll-to-top-btn" onClick={this.scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        )}
      </div>
    );
  }
}

export default ProductListing;
