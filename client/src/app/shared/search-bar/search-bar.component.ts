import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

	public searchText: string;
	public faSearch = faSearch;

	constructor() { }

	searchHandler() {
		console.log('search handler clicked');
	}

	ngOnInit() {
	}

}
