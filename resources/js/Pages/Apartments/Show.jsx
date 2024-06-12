import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import toast from "react-hot-toast";
import { faCheckSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ReservationForm from "./ReservationForm";
import { faBed, faBath, faUtensils, faTv } from '@fortawesome/free-solid-svg-icons';

const Show = ({ apartment, auth }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showRentForm, setShowRentForm] = useState(false); // Stāvoklis, lai izsekotu noma formas redzamību
  const [reviews, setReviews] = useState(apartment.reviews);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (auth.user) {
      const userHasReviewed = reviews.some(review => review.user_id === auth.user.id);
      setHasReviewed(userHasReviewed);
    }
  }, [reviews, auth.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/reviews", {
        apartment_id: apartment.id,
        user_id: auth.user.id,
        review,
        rating,
      });
      const newReview = { review, rating, user_id: auth.user.id, username: auth.user.name };
      setReviews([newReview, ...reviews]);
      setReview("");
      setRating("");
      setSubmitted(true);
      toast.success("Atsauksme iesniegta veiksmīgi!");
      setTimeout(() => setSubmitted(false), 1000000);
      setHasReviewed(true);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Radās kļūda, iesniedzot atsauksmi.");
    }
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return "Nav novērtējumu";

    const totalRating = reviews.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0);
    const averageRating = totalRating / reviews.length;

    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < averageRating) {
        stars.push(<FontAwesomeIcon icon={faStar} key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FontAwesomeIcon icon={faStar} key={i} className="text-gray-300" />);
      }
    }
    return <>{stars}</>;
  };

  const generateStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FontAwesomeIcon icon={faStar} key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FontAwesomeIcon icon={faStar} key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Apartments" />
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md relative">
        <h1 className="text-2xl font-bold mb-4">{apartment.name}</h1>
        <a href="/apartments" className="text-green-300 text-lg font-bold absolute top-0 right-0 mt-4 mr-4">Back</a>
        <img src={`/storage/image/${apartment.image}`} alt={apartment.name} className="w-full h-100 object-cover mb-4 rounded-md" />

        <p className="mb-2"><span className="font-semibold">Apraksts:</span> {apartment.description}</p>
        <p className="mb-2">
          <span className="font-semibold">Adrese:</span>{" "}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(apartment.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {apartment.address}
          </a>
        </p>

        <p className="mb-2"><span className="font-semibold">Cena no :</span> ${apartment.price} <span className="font-semibold"> par nakti </span></p>
        
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowRentForm(!showRentForm)} // Pārslēdz noma formas redzamību
        >
          RENT
        </button>
        
        {showRentForm && (
          <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md relative">
            <h2 className="text-xl font-semibold mb-2">Rent</h2>
            <ReservationForm apartment={apartment} auth={auth} />
          </div>
        )}

        <ul className="flex space-x-4 mt-2">
          <li>
            <FontAwesomeIcon icon={apartment.bedroom ? faCheckSquare : faTimesCircle} className={apartment.bedroom ? 'text-green-900' : 'text-red-900'} />
            <span className="ml-2"><FontAwesomeIcon icon={faBed} /></span>
          </li>
          <li>
            <FontAwesomeIcon icon={apartment.bathroom ? faCheckSquare : faTimesCircle} className={apartment.bathroom ? 'text-green-900' : 'text-red-900'} />
            <span className="ml-2"><FontAwesomeIcon icon={faBath} /></span>
          </li>
          <li>
            <FontAwesomeIcon icon={apartment.kitchen ? faCheckSquare : faTimesCircle} className={apartment.kitchen ? 'text-green-900' : 'text-red-900'} />
            <span className="ml-2"><FontAwesomeIcon icon={faUtensils} /></span>
          </li>
          <li>
            <FontAwesomeIcon icon={apartment.tv ? faCheckSquare : faTimesCircle} className={apartment.tv ? 'text-green-900' : 'text-red-900'} />
            <span className="ml-2"><FontAwesomeIcon icon={faTv} /></span>
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Atsauksmes:</h2>
        <p className="mb-2">
          <span className="font-semibold">Vidējais novērtējums:</span> {calculateAverageRating(reviews)}
        </p>

        <ul>
          {reviews.map((review, index) => (
            <li key={index} className="border-b py-2">
              {review.username && (
                <p><span className="font-semibold">Lietotājs:</span> {review.username}</p>
              )}
              <p><span className="font-semibold">Novērtējums:</span> {generateStars(review.rating)}</p>
              <p><span className="font-semibold">Atsauksme:</span> {review.review}</p>
            </li>
          ))}
        </ul>

        {auth.user ? (
          <>
            {!hasReviewed && !showForm && !submitted && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowForm(true)}
              >
                Publicēt atsauksmi
              </button>
            )}
            {showForm && !submitted && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Novērtējums:</label>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="border rounded p-1"
                    min="1"
                    max="5"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Atsauksme:</label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="border rounded p-1"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Publicēt atsauksmi
                </button>
              </form>
            )}
          </>
        ) : (
          <p className="text-red-500 mt-4">Lai iesniegtu atsauksmi, lūdzu, pieslēdzieties savam kontam.</p>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
