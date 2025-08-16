import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isEmpty } from "@/lib/helpers";
import { formatDate, getFullName } from "@/lib/utils";

type Props = {
  data: any;
  loading: boolean;
  setSearch: (search: string) => void;
};

const ListData = ({ data, loading }: Props) => {
  return (
    <div className="relative w-full overflow-y-auto">
      <Table>
        <TableHeader className="uppercase">
          <TableRow>
            <TableHead className="sticky left-0 z-10 min-w-[50px] bg-white">
              No
            </TableHead>
            <TableHead className="sticky left-[50px] z-10 bg-white">
              Name
            </TableHead>
            <TableHead>Number Phone</TableHead>
            <TableHead>Date of Bird</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isEmpty(data) ? (
            data.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell className="sticky left-0 z-10 min-w-[50px] bg-white">
                  {user.id}
                </TableCell>
                <TableCell className="sticky left-[50px] z-10 bg-white">
                  {getFullName(user.firstName, user.lastName)}
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{formatDate(user.birthDate)}</TableCell>
                <TableCell>{user.address.city}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                {loading ? "Loading..." : "No data found"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListData;
