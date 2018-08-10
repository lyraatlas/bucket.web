import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faComment, faEdit, faHeart, faPen, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CONST } from '../../../../constants';
import { AlertType, EditControlMode } from '../../../../enumerations';
import { ErrorEventBus } from '../../../../event-buses';
import { IBucket, IBucketItem, ITokenPayload } from '../../../../models';
import { AlertService } from '../../../../services';
import { BucketItemService } from '../../../../services/bucket-item.service';
import { BucketService } from '../../../../services/bucket.service';
import { BucketUtilities } from '../../utilities/bucket-utilities';

@Component({
    selector: 'app-bucket-detail',
    templateUrl: './bucket-detail.component.html',
    styleUrls: ['./bucket-detail.component.scss']
})
export class BucketDetailComponent implements OnInit {
    // Icons
    public faHeart = faHeart;
    public faEdit = faEdit;
    public faPlusCircle = faPlusCircle;
    public faTrashAlt = faTrashAlt;
    public faComment = faComment;
    public faPen = faPen;

    public currentBucketId: string;
    public bucket: IBucket;
    public itemsPerRow = 4;
    public bucketItemTable: Array<Array<IBucket>> = new Array();
    public editControlMode = EditControlMode.edit;
    public originalName: string;
    public originalDesc: string;

    public userId: string = (JSON.parse(localStorage.getItem(CONST.CLIENT_DECODED_TOKEN_LOCATION))  as ITokenPayload).userId;

    constructor(private route: ActivatedRoute,
        private router: Router,
        public bucketService: BucketService,
        public bucketItemService: BucketItemService,
        private errorEventBus: ErrorEventBus,
        public ngxSmartModalService: NgxSmartModalService,
        public alertService: AlertService,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            // if there isn't an id then it's a new product.
            if (params['id']) {
                this.currentBucketId = params['id'];
                this.fetchBucket();
            }
        });
    }

    backToBuckets() {
        this.router.navigate(['/bucket-board']);
    }

    showDeleteConfirm(){
        this.ngxSmartModalService.open("deleteConfirmModal");
    }

    cancelDelete(){
        this.ngxSmartModalService.close("deleteConfirmModal");
    }

    deleteBucket(){
        this.bucketService.delete(this.currentBucketId).subscribe((item)=>{
            // item is some kind of delete response;
            console.dir(item);
            this.alertService.send({
                text: "Successfully Deleted Bucket Board",
                alertType: AlertType.success
            }, true);
            this.ngxSmartModalService.close("deleteConfirmModal");
            this.backToBuckets();
        })
    }

    deleteBucketItem(bucketItem: IBucketItem){
        this.bucketItemService.delete(bucketItem._id).subscribe(res =>{
            // after we have deleted this bucket item, we need to clean up the bucket as well, and remove this item from it.
            const index = (this.bucket.bucketItems as IBucketItem[]).findIndex((element) =>{
                return element._id === bucketItem._id;
            });

            this.bucket.bucketItems.splice(index,1);

            this.bucketService.update(this.bucket,this.bucket._id).subscribe(bucket =>{
                this.bucket = bucket;
            }, error => {
                this.errorEventBus.throw(error);
            });
            
        }, error => {
            this.errorEventBus.throw(error);
        });
    }

    toggleLike(){
        console.log('About to toggle the like');

        if(this.bucket.likedBy.indexOf(BucketUtilities.getCurrentUserId()) > -1){
            this.bucketService.liker.removeLike(this.bucket).subscribe(bucket =>{
                this.bucket = bucket;
                this.bucket.isLikedByCurrentUser = false;
            }, error => {
                this.errorEventBus.throw(error);
            });
        }else{
            this.bucketService.liker.addLike(this.bucket).subscribe(bucket =>{
                this.bucket = bucket;
                this.bucket.isLikedByCurrentUser = true;
            }, error => {
                this.errorEventBus.throw(error);
            });
        }
    }


    bucketSaved(bucket:IBucket){
        this.ngxSmartModalService.close("quickEditBucketModal");
        this.fetchBucket();
    }

    editBucket(bucket: IBucket) {
        this.originalName = bucket.name;
        this.originalDesc = bucket.description;
        this.editControlMode = EditControlMode.edit;
        this.ngxSmartModalService.open("quickEditBucketModal");
    }

    canceled(){
        this.bucket.description = this.originalDesc;
        this.bucket.name = this.originalName;
        this.ngxSmartModalService.close("quickEditBucketModal");
    }

    bucketItemCancel(){
        this.ngxSmartModalService.close("quickEditBucketItem");
    }

    addBucketItem(){
        this.ngxSmartModalService.open("quickEditBucketItem");
    }

    fetchBucket(): any {

        this.bucketService.get(this.currentBucketId).subscribe((item: IBucket) => {

            this.bucket = item;

            BucketUtilities.calculateLikeStatus(new Array(this.bucket));

            if(this.bucket && this.bucket.bucketItems){

                const numberOfRows = Math.ceil(this.bucket.bucketItems.length/this.itemsPerRow);

                for (let i = 0; i < numberOfRows; i++) {
                    this.bucketItemTable[i] = new Array<IBucket>();
                }
    
                // Now we're going to build up a list of rows.  we're going to put 4 items in each row.
                let currentBucketIndex = 0;
    
                for (let i = 0; i < numberOfRows; i++) {
                    for (let slotNumber = 0; slotNumber < this.itemsPerRow; slotNumber++) {
                        this.bucketItemTable[i][slotNumber] = this.bucket.bucketItems[currentBucketIndex] as IBucketItem;
                        ++currentBucketIndex;
                    }
                }    
            }
        }, error => {
            this.errorEventBus.throw(error);
        });
    }
}
