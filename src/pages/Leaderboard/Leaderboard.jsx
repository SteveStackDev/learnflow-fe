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
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Data
import { leaderboardData } from "./data";

function Leaderboard() {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Hero Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Bảng Xếp Hạng Thành Tích</Typography>
        <Typography>
          Tôn vinh nỗ lực học tập không ngừng nghỉ. Nơi những nhà phát triển tài
          năng hội ngộ, thi đua và chinh phục những đỉnh cao công nghệ mới mỗi
          ngày.
        </Typography>
      </Container>

      {/* Podium Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          {leaderboardData.podiumSection.map((obj, index) => (
            <Grid key={index} size={4}>
              <Box>
                <Typography>#{obj.rank}</Typography>
                <Avatar src={obj.avatar} alt={obj.name} />
                <Typography>{obj.name}</Typography>
                <Typography>{obj.points}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Filter & Search Bar Section */}
      <Container disableGutters maxWidth={false}>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1}>
            {leaderboardData.topTabs.map((item, index) => (
              <Button
                key={index}
                variant={index === 0 ? "contained" : "outlined"}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField select defaultValue="this-week">
              <MenuItem value="this-week">Tuần này</MenuItem>
            </TextField>
            <TextField placeholder="Tìm người dùng..." />
          </Stack>
        </Stack>
      </Container>

      {/* Ranking Table Section */}
      <Container disableGutters maxWidth={false}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>HANG</TableCell>
                <TableCell>NGƯỜI DÙNG</TableCell>
                <TableCell>THÀNH TÍCH</TableCell>
                <TableCell>XU HƯỚNG</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.rankingTableSection.map((obj, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{obj.rank}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Avatar src={obj.avatar} size="small" />
                      <Typography>{obj.user}</Typography>
                      {obj.isCurrentUser && (
                        <Chip label="CURRENT" size="small" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography>{obj.points}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{obj.trend}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Stack direction="row">
          <Pagination count={15} page={1} />
        </Stack>
      </Container>
      {/* Guide Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Làm thế nào để leo hạng?</Typography>
        <Grid container spacing={2}>
          {leaderboardData.guideSection.map((item, index) => (
            <Grid key={index} size={3}>
              <Card>
                <CardContent>
                  <Box>{item.icon}</Box>
                  <Typography>{item.title}</Typography>
                  <Typography>{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* 6. FAQ Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Câu hỏi thường gặp</Typography>
        <Box>
          {leaderboardData.faqSection.map((obj, index) => (
            <Accordion key={index} defaultExpanded={index === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span">{obj.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{obj.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Container>
  );
}

export default Leaderboard;
