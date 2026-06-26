// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Pagination from "@mui/material/Pagination";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Data
import { roadmapData } from "./data";

// Images
import heroUrl from "~/assets/images/Roadmap/hero.webp";

function Roadmap() {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Hero Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Chip label="Định hướng tương lai" variant="contained" />
            <Typography>Lộ Trình Nghề Nghiệp Công Nghệ</Typography>
            <Typography>
              Không còn lạc lối giữa hàng nghìn công nghệ. Chúng tôi cung cấp
              bản đồ học tập chi tiết từ con số 0 đến khi bạn sẵn sàng cho công
              việc mơ ước.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Khám phá ngay</Button>
              <Button variant="outlined">Tư vấn lộ trình</Button>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Box component="img" src={heroUrl} alt="Hero Image" />
          </Grid>
        </Grid>
      </Container>

      {/* Search & Filter Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Lựa chọn con đường của bạn</Typography>
        <Stack direction="row" spacing={2}>
          <TextField placeholder="Tìm vị trí công nghệ bạn muốn theo đuổi..." />
          <Typography>{roadmapData.filterSection.stats}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={2}>
            {roadmapData.filterSection.tabs.map((tab, index) => (
              <Button
                key={index}
                variant={index === 0 ? "contained" : "outlined"}
              >
                {tab}
              </Button>
            ))}
          </Stack>
          <TextField
            select
            defaultValue="all"
            label={roadmapData.filterSection.selectLabel}
          >
            <MenuItem value="all">Tất cả trình độ</MenuItem>
          </TextField>
        </Stack>
      </Container>
      {/* Cards Grid Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          {roadmapData.cardsSection.map((card, index) => (
            <Grid key={index} size={3}>
              <Card>
                {card.badge && <Chip label={card.badge} />}
                <CardMedia
                  component="img"
                  height="140"
                  image={card.imageUrl}
                  alt={card.title}
                />
                <CardContent>
                  <Typography>{card.title}</Typography>
                  <Typography>{card.description}</Typography>
                  <Stack direction="row" spacing={1}>
                    {card.tags.map((item, index) => (
                      <Chip key={index} label={item} variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small">{card.actionText}</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row">
          <Pagination count={3} page={1} />
        </Stack>
      </Container>
      {/* Suggestion Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Không biết bắt đầu từ đâu?</Typography>
        <Typography>
          Đừng lo lắng, hãy chọn lĩnh vực mà bạn cảm thấy hứng thú nhất. Chúng
          tôi sẽ gợi ý hướng đi phù hợp.
        </Typography>
        <Grid container spacing={2}>
          {roadmapData.suggestSection.map((obj, index) => (
            <Grid key={index} size={3}>
              <Card>
                <CardContent>
                  <Box>{obj.icon}</Box>
                  <Typography>{obj.title}</Typography>
                  <Typography>{obj.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Container disableGutters maxWidth={false}>
        <Box>
          {roadmapData.faqSection.map((obj, index) => {
            return (
              <Accordion key={index} defaultExpanded={index === 0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${index + 1}-panel${index + 1}-content`}
                  id={`${index + 1}-panel${index + 1}-header`}
                >
                  <Typography component="span">{obj.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{obj.description}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Container>
  );
}

export default Roadmap;
