import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { predictReview } from "@/lib/lib";

export default function Home() {
  const [abv, setAbv] = useState()
  const [id, setId] = useState()
  const [brewerId, setBrewerId] = useState()
  const [appearance, setAppearance] = useState()
  const [aroma, setAroma] = useState()
  const [palate, setPalate] = useState()
  const [taste, setTaste] = useState()
  const [style, setStyle] = useState("")
  const [review, setReview] = useState("")
  const [result, setResult] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit() {
    const beerReview = {
      abv: abv,
      beerId: id, // Assuming `id` corresponds to `beerId`
      brewerId: brewerId,
      appearance: appearance,
      aroma: aroma,
      palate: palate,
      taste: taste,
      style: style,
      reviewText: review // Assuming `review` corresponds to `reviewText`
    };

    setResult(await predictReview(beerReview))
    setSubmitted(false)
  }


  return (
    <>
      <Form>
        <Container style={{marginTop: '10vh'}}>
          <Row>
            <Col>
            <Form.Group>
              <Form.Label>ABV</Form.Label>
              <Form.Control value={abv} onChange={e => setAbv(e.target.value)} type="number"/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control value={id} onChange={e => setId(e.target.value)} type="number"/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label>Brewer ID</Form.Label>
              <Form.Control value={brewerId} onChange={e => setBrewerId(e.target.value)} type="number"/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label>Appearance</Form.Label>
              <Form.Control value={appearance} onChange={e => setAppearance(e.target.value)} type="number"/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label>Aroma</Form.Label>
              <Form.Control value={aroma} onChange={e => setAroma(e.target.value)} type="number"/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label>Palate</Form.Label>
              <Form.Control value={palate} onChange={e => setPalate(e.target.value)} type="number"/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label>Taste</Form.Label>
              <Form.Control value={taste} onChange={e => setTaste(e.target.value)} type="number"/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label>Style</Form.Label>
              <Form.Control value={style} onChange={e => setStyle(e.target.value)} type="text"/>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label>Review Text</Form.Label>
              <Form.Control value={review} onChange={e => setReview(e.target.value)} as="textarea" rows={1} />
            </Form.Group>
            </Col>
          </Row>
          <br/>

          <Button onClick={handleSubmit} variant="outline-primary">Submit</Button>
          <br/><br/>
          {!submitted && !result && <Spinner animation="grow" />}

          {result && <h2>Overall Rating Prediction: {result.predicted_rating.toFixed(1)}</h2>}

        </Container>
      </Form>
    </>
  );
}
