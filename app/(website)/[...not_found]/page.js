import NotFound from "./notfound";

function Error({ statusCode }) {
  return (
    <div>
      {statusCode ? (
        `An error ${statusCode} occurred on server`
      ) : (
        <NotFound statusCode={statusCode} />
      )}
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res
    ? res.statusCode
    : err
    ? err.statusCode
    : 404;
  return { statusCode };
};

export default Error;