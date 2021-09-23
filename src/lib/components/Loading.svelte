<script>
  let dots = '';
  setInterval(() => {
    if (dots.length < 6) {
      dots += '.';
    } else {
      dots = '';
    }
  }, 500);
</script>

{dots}
