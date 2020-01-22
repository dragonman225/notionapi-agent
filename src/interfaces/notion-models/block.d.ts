import { BasicBlock } from "./block/basic_block"
import { DatabaseBlock } from "./block/database"
import { MediaBlock } from "./block/media"
import { EmbedBlock } from "./block/embed"
import { AdvancedBlock } from "./block/advanced_block"

/** 
 * Union of all types of blocks.
 * 
 * @category Notion Block
 */
export type Block =
  BasicBlock | DatabaseBlock | MediaBlock | EmbedBlock | AdvancedBlock